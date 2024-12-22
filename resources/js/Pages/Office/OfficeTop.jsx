import Layouts from '@/Layouts/Layouts';
import {
    Heading,
    Image,
    Link,
    ListItem,
    Text,
    UnorderedList,
} from '@chakra-ui/react';

const OfficeTop = ({ office }) => {
    console.log(office);
    return (
        <>
            <Heading as="h1">{office.office_name}</Heading>
            <Text>こんにちは！</Text>
        </>
    );
};

export default OfficeTop;
