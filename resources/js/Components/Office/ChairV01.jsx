import { Box, Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { useAuth } from "@/hooks/useAuth";

const ChairV01 = ({officeId, seatId, chats, speechBubble}) => {
    const requestUser = useAuth().user;
    const officeImagePath = '/img/office';
    const messagesRef = useRef([]);
    const [userAvatar, setUserAvatar] = useState();
    const [seatStatus, setSeatStatus] = useState({
        isAvailable: true,
        userId: null,
        userAvatar: null,
    });
    const [isAvailable, setIsAvailable] = useState(true);
    const [messages, setMessages] = useState(chats);    // ルーム内の全チャットメッセージ
    const [thisUserMessage, setThisUserMessage] = useState([]);
    const [hasSentMessage, setHasSentMessage] = useState();
    const [thisUser, setThisUser] = useState(requestUser);


    /**
     * Laravel Reverbのセットアップ
     */
    window.Pusher = Pusher;
    const echo = new Echo({
        broadcaster: "reverb",
        key: import.meta.env.VITE_REVERB_APP_KEY, // Laravelの設定に合わせて変更
        wsHost: import.meta.env.VITE_REVERB_HOST,    // ブラウザからアクセスする際のホスト名
        wsPort: import.meta.env.VITE_REVERB_PORT,           // コンテナ側でEXPOSEしている WebSocketポート
        wssPort: import.meta.env.VITE_REVERB_PORT,          // HTTPS/SSLを使わないローカルなら実質同じポートでOK
        forceTLS: import.meta.env.VITE_REVERB_FORCE_TLS,        // HTTPSを使用していない場合はfalse
        disableStats: true,
        cluster: import.meta.env.VITE_REVERB_CLUSTER,
        enabledTransports: 'ws'
    });

    // useEffect(() => {
    //     messagesRef.current = messages;
    // }, [messages]);
    

    /**
     * 座席情報の初期化
     */
    useEffect(() => {
        // console.log(messagesRef.current);
        const fetcheSeatStatus = async(officeId, seatId) => {
            const response = await axios.get(route('office.getSelectedSeatStatus', {office_id: officeId, seat_id: seatId}));
            const seatInfo = response.data.seatInfo;
            const sittingUserAvatar = response.data.userAvatar.avatar_file_path;

            setSeatStatus({
                isAvailable:seatInfo.is_availalble,
                userId: seatInfo.user_id,
                userAvatar: sittingUserAvatar,
            });

            // if (seatInfo.user_id) {
            //     const currentMessages = messages.filter(message => message.deleted_at == null);
            //     console.log(currentMessages);
            //     const userMessage = currentMessages.find(message => message.user_id === seatInfo.user_id);
            //     // console.log(userMessage);
            //     setThisUserMessage(userMessage ? userMessage.text : []);
            // }
        }

        if (seatStatus.userAvatar == null) {
            fetcheSeatStatus(officeId, seatId);
        }


    }, [officeId, seatId, seatStatus.userAvatar]);

    /**
    * セッション情報取得 
    */
   useEffect(() => {
    const fetcheSessionStatus = async() => {
      try {
        const  response = await axios.get(route('office.getSessionStatus', {office_id: officeId, user_id: thisUser.id}));
        setHasSentMessage(response.data.has_sent_message);
        // console.log('HasSentMessage：', hasSentMessage);
      } catch(error) {
        console.error('セッション情報の取得に失敗', error);
      }
    }

    fetcheSessionStatus();
   }, [officeId, seatStatus.userId]);

    /**
     * reverbサーバーより非同期で座席の状態を取得
     */
    useEffect(() => {
        const channel = window.Echo.private("office_seats");

        channel.listen("SeatOccupied", (data) => {
            setSeatStatus((prevStatus) => {
                const updatedStatus = {...prevStatus};

                if(seatId == data.originalSeatId) {
                    updatedStatus.isAvailable = true;
                    updatedStatus.userId = null;
                    updatedStatus.userAvatar = null;
                }

                // 座席状態の更新
                if(seatId == data.seatId) {
                    updatedStatus.isAvailable = false;
                    updatedStatus.userId = data.userId;
                    updatedStatus.userAvatar = data.userAvatar;
                }

                return updatedStatus;
            })
        });

        return () => {
            channel.unsubscribe();
        };
    }, [window.Echo]);

    /**
     * チャットメッセージの初期化
     */
    useEffect(() => {
        const fetcheThisUserMessage = async(officeId, seatId) => {
            try {
                // console.log(messages);
                const response = await axios.get(route('office.getSelectedSeatStatus', {office_id: officeId, seat_id: seatId}));
                const seatInfo = response.data.seatInfo;
                // console.log(seatInfo);

                if (messages.length > 0) {
                
                    if (seatInfo.user_id != null) {
                        const currentMessages = messages.filter(message => message.deleted_at == null); //アクティブなメッセージを取得
                        if(currentMessages.length === 0) {
                            return;
                        }
                        const userMessage = currentMessages.find(message => message.user_id == seatInfo.user_id);
                        // console.log(userMessage);

                        if (userMessage) {
                            setThisUserMessage(userMessage.text);
                        } else {
                            setThisUserMessage([]);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetcheThisUserMessage(officeId, seatId);
    }, [officeId, seatId, messages, seatStatus.userId]);

    useEffect(() => {
        const channel = window.Echo.private("deleted_leave_user_messages");


        const handleDeletedMessages = async() => {
            try {
                const response = await axios.get(route('office.getSelectedSeatStatus', {office_id: officeId, seat_id: seatId}));
                const seatInfo = response.data.seatInfo;
                channel.listen("ChatMessageDeleted", (data) => {
                    console.log("ああああああああああああああああああああああああああああああああああああ");
                    // console.log(data);
                    // 削除済みのメッセージを除外した新しいメッセージリストをセット
                    setMessages(data.filter(message => message.deleted_at == null));
                    console.log(messages);
                
                    const currentMessages = data.filter(message => message.deleted_at == null); //アクティブなメッセージを取得
                    const userMessage = currentMessages.find(message => message.user_id == seatInfo.user_id);
        
                    if (userMessage) {
                        setThisUserMessage(userMessage.text);
                    } else {
                        setThisUserMessage([]);
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
        handleDeletedMessages();

        return () => {
            channel.stopListening("ChatMessageDeleted");
        };
    }, [officeId, seatId, messages, seatStatus]);

    /**
     * チャットメッセージが追加されたらブロードキャストにより受信
     */
    useEffect(() => {
        const channel = window.Echo.private("send_message");
        const fetcheThisUserMessage = async(officeId, seatId) => {
            try {
                // console.log(messages);
                const response = await axios.get(route('office.getSelectedSeatStatus', {office_id: officeId, seat_id: seatId}));
                const seatInfo = response.data.seatInfo;

                channel.listen("SendMessageEvent", (data) => {
                    // console.log(data);
                    setMessages((prevMessages) => [
                        { office_id: Number(data.officeId), user_id: Number(data.userId), text: data.message},
                        ...prevMessages
                    ]);

                    if(seatInfo.user_id == data.userId) {
                        setThisUserMessage(data.message);
                    };

                    setThisUser(prev => ({
                        ...prev,
                        has_sent_message: data.hasSentMessage,
                    }))
                });

            } catch (error) {
                console.error(error);
            }
        }
        fetcheThisUserMessage(officeId, seatId);


        return () => {
            channel.unsubscribe();
        };

    }, [seatId]);

    /**
     * ユーザー操作により座席情報の更新
     */
    const handleSeatStatus = async(officeId, seatId) => {
        try {
            const response = await axios.post(route('office.seatOccupy', {office_id: officeId, seat_id: seatId }));

        } catch (error) {
            console.error(error);
            if(error.response && error.response.status === 409) {
                alert('この席は既に着席されています。');
            }
        }
    }


    return(
        <>
            {
                seatStatus.isAvailable == true ? (
                    <Box
                        cursor="pointer"
                        w="60px"
                        h="60px"
                        borderRadius="50%"
                        bgColor="#aca8a8"
                        border="1px solid red"
                        onClick={ () => handleSeatStatus(officeId, seatId)}
                    />
                ) : (
                    <Box position="relative">
                        <Image
                            cursor="pointer"
                            w="60px"
                            h="60px"
                            borderRadius="50%"
                            objectFit="cover"
                            border="2px solid blue"
                            src={seatStatus.userAvatar} onClick={ () => handleSeatStatus(officeId, seatId)}
                        />
                        {
                            // ↓吹き出し↓
                            // ユーザー自身の場合
                            thisUser.id == seatStatus.userId ? (
                                thisUserMessage.length !== 0 ? (
                                    thisUser.has_sent_message ? (
                                        // 左側の座席の場合
                                        speechBubble === "left" ? (
                                            <Box
                                                key={thisUserMessage}
                                                position="absolute"
                                                top="-50px"
                                                left="-50px"
                                                transform="translate(-100%, -50%)"
                                                p={4}
                                                bgColor="white"
                                                borderRadius="30px"
                                                w="300px"
                                                h="100px"
                                                _before={{
                                                    content: '""',
                                                    position: "absolute",
                                                    bottom: "-15px",
                                                    right: "-47px",
                                                    transform: "translateX(-50%) rotate(-45deg)",
                                                    borderLeft: "30px solid transparent",
                                                    borderRight: "30px solid transparent",
                                                    borderTop: "50px solid white",
                                                }}
                                            >
                                                {thisUserMessage}
                                            </Box>
                                        ) : (
                                            // 右側の座席の場合
                                            <Box
                                                key={thisUserMessage}
                                                position="absolute"
                                                top="-50px"
                                                right="-50px"
                                                transform="translate(100%, -50%)"
                                                p={4}
                                                bgColor="white"
                                                borderRadius="30px"
                                                w="300px"
                                                h="100px"
                                                _before={{
                                                    content: '""',
                                                    position: "absolute",
                                                    bottom: "-15px",
                                                    left: "7px",
                                                    transform: "translateX(-50%) rotate(45deg)",
                                                    borderLeft: "30px solid transparent",
                                                    borderRight: "30px solid transparent",
                                                    borderTop: "50px solid white",
                                                }}
                                            >
                                                {thisUserMessage}
                                            </Box>
                                        )
                                    ) : ''
                                ) : ''
                            ) : (
                                // 他ユーザーの場合
                                thisUserMessage.length !== 0 ? (
                                    speechBubble === "left" ? (
                                        <Box
                                            key={thisUserMessage}
                                            position="absolute"
                                            top="-50px"
                                            left="-50px"
                                            transform="translate(-100%, -50%)"
                                            p={4}
                                            bgColor="white"
                                            borderRadius="30px"
                                            w="300px"
                                            h="100px"
                                            _before={{
                                                content: '""',
                                                position: "absolute",
                                                bottom: "-15px",
                                                right: "-47px",
                                                transform: "translateX(-50%) rotate(-45deg)",
                                                borderLeft: "30px solid transparent",
                                                borderRight: "30px solid transparent",
                                                borderTop: "50px solid white",
                                            }}
                                        >
                                            {thisUserMessage}
                                        </Box>
                                    ) : (
                                        // 右側の座席の場合
                                        <Box
                                            key={thisUserMessage}
                                            position="absolute"
                                            top="-50px"
                                            right="-50px"
                                            transform="translate(100%, -50%)"
                                            p={4}
                                            bgColor="white"
                                            borderRadius="30px"
                                            w="300px"
                                            h="100px"
                                            _before={{
                                                content: '""',
                                                position: "absolute",
                                                bottom: "-15px",
                                                left: "7px",
                                                transform: "translateX(-50%) rotate(45deg)",
                                                borderLeft: "30px solid transparent",
                                                borderRight: "30px solid transparent",
                                                borderTop: "50px solid white",
                                            }}
                                        >
                                            {thisUserMessage}
                                        </Box>
                                    )
                                ) : ''
                            )
                        }
                    </Box>
                )
            }
        </>
    )
}





export default ChairV01;
