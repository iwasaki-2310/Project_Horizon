import { Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

import Pusher from "pusher-js";
import Echo from "laravel-echo";

const ChairV01 = ({officeId, seatId}) => {
    const officeImagePath = '/img/office';
    const [userAvatar, setUserAvatar] = useState();
    const [isAvailable, setIsAvailable] = useState(true);

    /**
     * Laravel Reverbのセットアップ
     */
    window.Pusher = Pusher;
    const echo = new Echo({
        broadcaster: "reverb",
        key: import.meta.env.VITE_REVERB_APP_KEY, // Laravelの設定に合わせて変更
        wsHost: import.meta.env.VITE_REVERB_HOST,    // ブラウザからアクセスする際のホスト名
        wsPort: 6001,           // コンテナ側でEXPOSEしている WebSocketポート
        wssPort: 6001,          // HTTPS/SSLを使わないローカルなら実質同じポートでOK
        forceTLS: false,        // HTTPSを使用していない場合はfalse
        disableStats: true,
        cluster: "ap3",
        enabledTransports: 'ws'
    });

    /**
     * 座席情報の更新
     */
    const handleSeatStatus = async(officeId, seatId) => {
        try {
            const response = await axios.post(route('office.seatOccupy', {office_id: officeId, seat_id: seatId }))
            console.log('ユーザーを着席させました。');
            console.log(response.data.userInfo.avatar_file_path);
            const userAvatar = response.data.userInfo.avatar_file_path;
            setUserAvatar(userAvatar);

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * 座席情報の取得
     */
    // const fetchSelectedSeatStatus = async() => {
    //     try {
    //         const response = await axios.get(route('office.getSelectedSeatStatus', {office_id: officeId, seat_id: seatId }));
    //         const seatStatus = response.data[0].is_availalble;

    //         console.log(seatStatus);

    //         if(seatStatus === '1') {
    //             handleSeatStatus(officeId, seatId);
    //             alert('この座席は座れます。');
    //         };
    //         if(seatStatus === '0') {
    //             alert('既に他のユーザーが使用中です。');
    //         };

    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        const channel = echo.private("office_seats");

        channel.listen("SeatOccupied", (event) => {
            if(event.seatId === seatId) {
                setUserAvatar(event.userAvatar); //座席が占領された場合にアバターを更新
                setIsAvailable(false);
                console.log("座席情報の取得に成功");
            }
        });

        // return() => {
        //     channel.stopListening("SeatOccupied");
        // }
    }, []);

    return(
        <>
            {
                userAvatar ? <Image w="40px" src={userAvatar} onClick={ () => handleSeatStatus(officeId, seatId)} /> :
                <Image w="40px" src={`${officeImagePath}/chair.svg`} onClick={ () => handleSeatStatus(officeId, seatId)} />
            }
        </>
    )
}

export default ChairV01;
