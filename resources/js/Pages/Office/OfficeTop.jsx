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
    const officeImagePath = '/img/office';
    return (
        <OfficeLayout officeName={office.office_name}>

        </OfficeLayout>
    );
};

export default OfficeTop;
