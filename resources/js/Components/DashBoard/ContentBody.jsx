import { Box } from "@chakra-ui/react";

//   コンテントコンポーネント
const ContentBody = ({ children }) => {
    return (
        <Box
            mt={3}
            p={5}
            h="90%"
            border="1px solid white"
            borderRadius="md"
        >
            {children}
        </Box>
    );
};

export default ContentBody;
