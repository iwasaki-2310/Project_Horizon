import { Image } from "@chakra-ui/react";

const ChairV01 = ({children}) => {
    const officeImagePath = '/img/office';
    return(
        <Image w="40px" src={`${officeImagePath}/chair.svg`} />
    )
}

export default ChairV01;
