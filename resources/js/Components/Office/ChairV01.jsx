import { Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const ChairV01 = ({officeId, seatId}) => {
    const officeImagePath = '/img/office';
    const [userAvatar, setUserAvatar] = useState();

        const handleSeatStatus = async(officeId, seatId) => {
            try {
                const response = await axios.post(route('office.sitSeat', {office_id: officeId, seat_id: seatId }))
                console.log('ユーザーを着席させました。');
                console.log(response.data.userInfo.avatar_file_path);
                const userAvatar = response.data.userInfo.avatar_file_path;
                setUserAvatar(userAvatar);

            } catch (error) {
                console.log(error);
            }
        }

        //
        const fetchSelectedSeatStatus = async() => {
            try {
                const response = await axios.get(route('office.getSelectedSeatStatus', {office_id: officeId, seat_id: seatId }));
                const seatStatus = response.data[0].is_availalble;

                console.log(seatStatus);

                if(seatStatus === '1') {
                    handleSeatStatus(officeId, seatId);
                    alert('この座席は座れます。');
                };
                if(seatStatus === '0') {
                    alert('既に他のユーザーが使用中です。');
                };

            } catch (error) {
                console.log(error);
            }
        };

    return(
        <>
            {userAvatar &&
                <Image w="40px" src={userAvatar} />
            }
            <Image w="40px" src={`${officeImagePath}/chair.svg`} onClick={fetchSelectedSeatStatus} />
        </>
    )
}

export default ChairV01;
