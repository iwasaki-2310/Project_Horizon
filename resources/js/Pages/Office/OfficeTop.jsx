import Layouts from '@/Layouts/Layouts';
import OfficeLayout from '@/Layouts/OfficeLayout';
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
        <OfficeLayout officeName={office.office_name}>
            <Text as="h2">ようこそ！</Text>
        </OfficeLayout>
    );
};

export default OfficeTop;
