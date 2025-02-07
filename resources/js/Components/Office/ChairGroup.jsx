import { Flex } from "@chakra-ui/react";

const ChairGroup = ({children}) => {
    return(
        <Flex flexDirection="column" justifyContent="space-between" h="90%">
            {children}
        </Flex>
    )
}

export default ChairGroup;
