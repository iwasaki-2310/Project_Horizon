import { Flex } from "@chakra-ui/react";

// コンテントヘッダー
const ContentHeader = ({ children }) => {
    return (
        <Flex justifyContent="space-between" alignItems="center">
            {children}
        </Flex>
    );
};

export default ContentHeader;
