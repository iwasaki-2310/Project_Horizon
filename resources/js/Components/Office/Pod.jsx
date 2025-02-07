import { Box } from "@chakra-ui/react";

const Pod = ({children}) => {
    return(
        <Box display="flex" justifyContent="center" alignItems="center" py={4} margin="0 auto" w="100%" h="80%">
            {children}
        </Box>
    )
}

export default Pod;
