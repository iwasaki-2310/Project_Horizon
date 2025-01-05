import { Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";

const ChairV01 = ({officeId, seatId}) => {
    const officeImagePath = '/img/office';

        const fetchSelectedSeatStatus = async() => {
            try {
                const response = await axios.get(route('office.getSelectedSeatStatus', {office_id: officeId, seat_id: seatId }));
                const seatStatus = response.data[0].is_availalble;

                console.log(seatStatus);

                if(seatStatus === '1') {
                    alert('この座席は座れます。');
                };
                if(seatStatus === '0') {
                    alert('既に他のユーザーが使用中です。');
                };

            } catch (error) {
                console.log(error);
            }
        }

    const handleSeatStatus = () => {
        try {
            console.log();
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <Image w="40px" src={`${officeImagePath}/chair.svg`} onClick={fetchSelectedSeatStatus} />
    )
}

export default ChairV01;
