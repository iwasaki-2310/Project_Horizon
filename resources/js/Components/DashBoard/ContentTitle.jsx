import { Heading } from "@chakra-ui/react";

//   コンテントタイトル
const ContentTitle = ({ children }) => {
    return (
        <Heading as="h2" color="white" fontWeight="bold" size="sm">
            {children}
        </Heading>
    );
};

export default ContentTitle;
