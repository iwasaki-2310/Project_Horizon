import ChairGroup from '@/Components/Office/ChairGroup';
import ChairV01 from '@/Components/Office/ChairV01';
import Pod from '@/Components/Office/Pod';
import TableV01 from '@/Components/Office/TableV01';
import Layouts from '@/Layouts/Layouts';
import OfficeLayout from '@/Layouts/OfficeLayout';
import {
    Box,
    Flex,
    Heading,
    Image,
    Link,
    ListItem,
    Text,
    UnorderedList,
} from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

const OfficeTop = ({ office }) => {

    // このページのみBodyタグにoverfro-hiddenを付与
    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return() => {
            document.body.classList.remove('overflow-hidden');
        }
    }, [])
    const officeImagePath = '/img/office';
    return (
        <>
            <Head>
                <meta name="body-class" content="overflow-hidden" />
            </Head>
            <OfficeLayout officeName={office.office_name}>
                <Flex flexWrap="wrap" justifyContent="space-between" px={5}>
                    <Pod>
                        <ChairGroup>
                            <ChairV01 seatId={1} />
                            <ChairV01 />
                            <ChairV01 />
                        </ChairGroup>
                        <TableV01 />
                        <ChairGroup>
                            <ChairV01 />
                            <ChairV01 />
                            <ChairV01 />
                        </ChairGroup>
                    </Pod>
                    <Pod>
                        <ChairGroup>
                            <ChairV01 />
                            <ChairV01 />
                            <ChairV01 />
                        </ChairGroup>
                        <TableV01 />
                        <ChairGroup>
                            <ChairV01 />
                            <ChairV01 />
                            <ChairV01 />
                        </ChairGroup>
                    </Pod>
                    <Pod>
                        <ChairGroup>
                            <ChairV01 />
                            <ChairV01 />
                            <ChairV01 />
                        </ChairGroup>
                        <TableV01 />
                        <ChairGroup>
                            <ChairV01 />
                            <ChairV01 />
                            <ChairV01 />
                        </ChairGroup>
                    </Pod>
                    <Pod>
                        <ChairGroup>
                            <ChairV01 />
                            <ChairV01 />
                            <ChairV01 />
                        </ChairGroup>
                        <TableV01 />
                        <ChairGroup>
                            <ChairV01 />
                            <ChairV01 />
                            <ChairV01 />
                        </ChairGroup>
                    </Pod>
                    <Pod>
                        <ChairGroup>
                            <ChairV01 />
                            <ChairV01 />
                            <ChairV01 />
                        </ChairGroup>
                        <TableV01 />
                        <ChairGroup>
                            <ChairV01 />
                            <ChairV01 />
                            <ChairV01 />
                        </ChairGroup>
                    </Pod>
                </Flex>

            </OfficeLayout>
        </>
    );
};

export default OfficeTop;
