import { Box } from "@chakra-ui/react";

// コンテントのスクロール部分
const ScrollArea = ({ children }) => {
    return (
        <Box overflow="auto" mt={3} maxH="90%">
            {children}
        </Box>
    );
};
export default ScrollArea;
