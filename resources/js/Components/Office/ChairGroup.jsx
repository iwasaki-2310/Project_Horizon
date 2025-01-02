import { Flex } from "@chakra-ui/react";

const ChairGroup = ({children}) => {
    return(
        <Flex justifyContent="space-between">
            {children}
        </Flex>
    )
}

export default ChairGroup;
