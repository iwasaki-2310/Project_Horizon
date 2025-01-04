import { Image } from "@chakra-ui/react";

const ChairV01 = ({seatId}) => {
    const officeImagePath = '/img/office';

    const handleSeatStatus = () => {
        try {

        } catch (error) {
            console.log(error);
        }
    }
    return(
        <Image w="40px" src={`${officeImagePath}/chair.svg`} onClick={handleSeatStatus} />
    )
}

export default ChairV01;
