import Layouts from '@/Layouts/Layouts';
import {
    Heading,
    Image,
    Link,
    ListItem,
    Text,
    UnorderedList,
} from '@chakra-ui/react';

const Password = ({ officeId }) => {
    console.log(officeId);
    return (
        <>
            <Heading as="h1">{office.office_name}</Heading>
            <Text>こんにちは！</Text>
        </>
    );
};

export default Password;
