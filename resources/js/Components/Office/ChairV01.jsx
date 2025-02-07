import { Box, Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

import Pusher from "pusher-js";
import Echo from "laravel-echo";

const ChairV01 = ({officeId, seatId}) => {
    const officeImagePath = '/img/office';
    const [userAvatar, setUserAvatar] = useState();
    const [seatStatus, setSeatStatus] = useState({
        isAvailable: true,
        userId: null,
        userAvatar: null,
    });
    const [isAvailable, setIsAvailable] = useState(true);

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

    /**
     * 座席情報の初期化
     */
    useEffect(() => {
        const fetcheSeatStatus = async(officeId, seatId) => {
            const response = await axios.get(route('office.getSelectedSeatStatus', {office_id: officeId, seat_id: seatId}));
            const seatInfo = response.data.seatInfo;
            const sittingUserAvatar = response.data.userAvatar.avatar_file_path;

            setSeatStatus({
                isAvailable:seatInfo.is_availalble,
                userId: seatInfo.user_id,
                userAvatar: sittingUserAvatar,
            })
        }

        if (seatStatus.userAvatar == null) {
            fetcheSeatStatus(officeId, seatId);
        }

    }, [officeId, seatId, seatStatus.userAvatar]);

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
     * ユーザー操作により座席情報の更新
     */
    const handleSeatStatus = async(officeId, seatId) => {
        try {
            const response = await axios.post(route('office.seatOccupy', {office_id: officeId, seat_id: seatId }));

        } catch (error) {
            console.log(error);
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
                ) :
                (
                    <Image
                        cursor="pointer"
                        w="60px"
                        h="60px"
                        borderRadius="50%"
                        objectFit="cover"
                        src={seatStatus.userAvatar} onClick={ () => handleSeatStatus(officeId, seatId)}
                    />
                )
            }
        </>
    )
}





export default ChairV01;
