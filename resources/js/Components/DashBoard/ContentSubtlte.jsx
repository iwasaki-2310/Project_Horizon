import { Heading } from "@chakra-ui/react";

//   コンテントタイトル
const ContentSubtlte = ({ children }) => {
    return (
        <Heading as="h3" color="white" fontWeight="bold" size="" textDecor="underline">
            {children}
        </Heading>
    );
};

export default ContentSubtlte;
