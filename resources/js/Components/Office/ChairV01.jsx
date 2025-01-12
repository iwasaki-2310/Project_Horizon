import { Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

import Pusher from "pusher-js";
import Echo from "laravel-echo";

const ChairV01 = ({officeId, seatId}) => {
    const officeImagePath = '/img/office';
    const [userAvatar, setUserAvatar] = useState();
    const [seatStatus, setSeatStatus] = useState({});
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
     * 座席情報の更新
     */
    const handleSeatStatus = async(officeId, seatId) => {
        try {
            const response = await axios.post(route('office.seatOccupy', {office_id: officeId, seat_id: seatId }))
            console.log('ユーザーを着席させました。');
            console.log(response);
            const userAvatar = response.data.userInfo.avatar_file_path;
            setUserAvatar(userAvatar);

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * 座席情報の取得
     */
    useEffect(() => {
        const fetcheSeatStatus = async(officeId) => {
            const response = await axios.get(route('office.getSelectedSeatStatus', {office_id: officeId, seat_id: seatId}));
            const SeatInfo = response.data.seatInfo;
            const sittingUserAvatar = response.data.userAvatar.avatar_file_path;
            console.log(SeatInfo);
            console.log(sittingUserAvatar);
            // const allUsersInfo = response.data.users;
            // console.log(allUsersInfo);

            setSeatStatus({isAvailable:SeatInfo.is_availalble ,userId: SeatInfo.user_id, userAvatar: sittingUserAvatar})
        }

        fetcheSeatStatus(officeId, seatId)
    }, []);

    useEffect(() => {
        const channel = window.Echo.private("office_seats");
        // console.log(channel);
        
        channel.listen("SeatOccupied", (data) => {
            // console.log('リアルタイムデータ：', data);
            
            // 座席状態の更新
            setSeatStatus((prevStatus) => {
                const updatedStatus = {
                    ...prevStatus,
                    [data.seatId]: {
                        isAvailable: false,
                        userId: data.userId,
                        userAvatar: data.userAvatar
                    },
                };
                console.log("更新された状態:", updatedStatus);
                return updatedStatus;
            });
        });

        return () => {
            console.log("useEffectのクリーンアップが実行されました");
            channel.unsubscribe();
        };
    }, [window.Echo]);

    useEffect(() => {
        // console.log("シートが更新されました。", seatStatus);
    }, [seatStatus])

    return(
        <>
            {
                seatStatus.isAvailable == true ? (
                    <Image w="40px" src={`${officeImagePath}/chair.svg`} onClick={ () => handleSeatStatus(officeId, seatId)} />
                ) :
                (
                    <Image w="40px" borderRadius="50%" src={seatStatus.userAvatar} onClick={ () => handleSeatStatus(officeId, seatId)} />
                )
            }
        </>
    )
}

export default ChairV01;
