import { Box } from "@chakra-ui/react";

const Pod = ({children}) => {
    return(
        <Box py={4} w="fit-content">
            {children}
        </Box>
    )
}

export default Pod;
