import { Heading } from "@chakra-ui/react";

//   コンテントタイトル
const ContentTitle = ({ children }) => {
    return (
        <Heading as="h2" color="gray.600" fontWeight="bold" size="sm">
            {children}
        </Heading>
    );
};

export default ContentTitle;
