import { Box } from "@chakra-ui/react";

// コンテントのスクロール部分
const ScrollArea = ({ children }) => {
    return (
        <Box
            overflow="auto"
            mt={3}
            maxH="200px"
            css={{
                "&::-webkit-scrollbar": {
                    width: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#a4b7e1",
                    borderRadius: "50px",
                    border: "2px solid transparent",
                },
                "&::-webkit-scrollbar-track": {
                    background: "transparent",
                },
            }}
        >
            {children}
        </Box>
    );
};
export default ScrollArea;
