import { Box } from "@chakra-ui/react";

//   コンテントコンポーネント
const DashContent = ({ children }) => {
    return (
        <Box
            bg="gray.50"
            pt="5"
            pb="8"
            px="4"
            minH="200px"
            maxH="60vh"
            borderRadius="md"
            boxShadow="md"
        >
            {children}
        </Box>
    );
};

export default DashContent;
