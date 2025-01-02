import { Image } from "@chakra-ui/react";

const TableV01 = ({children}) => {
    const officeImagePath = '/img/office';
    return(
        <Image src={`${officeImagePath}/table.svg`} py={1} />
    )
}

export default TableV01;
