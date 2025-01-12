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
import axios from 'axios';
import { useEffect, useState } from 'react';

const OfficeTop = ({ office }) => {

    const officeImagePath = '/img/office';
    const [seatStatus ,setSeatStatus] = useState({});

    console.log(office);

    // このページのみBodyタグにoverfro-hiddenを付与
    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return() => {
            document.body.classList.remove('overflow-hidden');
        }
    }, [])

    useEffect(() => {
        const fetchSeats = async() => {
            try {
                const response = await axios.get(route('office.getSeatsStatus', {office_id: office.id}));
                // console.log(response.data.seats[0].is_availalble);
                // setSeatStatus(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSeats();
    }, []);

    return (
        <>
            <Head>
                <meta name="body-class" content="overflow-hidden" />
            </Head>
            <OfficeLayout officeName={office.office_name}>
                <Flex flexWrap="wrap" justifyContent="space-between" px={5}>
                    <Pod>
                        <ChairGroup>
                            <ChairV01 officeId={office.id} seatId={1} />
                            <ChairV01 officeId={office.id} seatId={2} />
                            <ChairV01 officeId={office.id} seatId={3} />
                        </ChairGroup>
                        <TableV01 />
                        <ChairGroup>
                            <ChairV01 officeId={office.id} seatId={4} />
                            <ChairV01 officeId={office.id} seatId={5} />
                            <ChairV01 officeId={office.id} seatId={6} />
                        </ChairGroup>
                    </Pod>
                    <Pod>
                        <ChairGroup>
                            <ChairV01 officeId={office.id} seatId={7} />
                            <ChairV01 officeId={office.id} seatId={8} />
                            <ChairV01 officeId={office.id} seatId={9} />
                        </ChairGroup>
                        <TableV01 />
                        <ChairGroup>
                            <ChairV01 officeId={office.id} seatId={10} />
                            <ChairV01 officeId={office.id} seatId={11} />
                            <ChairV01 officeId={office.id} seatId={12} />
                        </ChairGroup>
                    </Pod>
                    <Pod>
                        <ChairGroup>
                            <ChairV01  officeId={office.id} seatId={13} />
                            <ChairV01  officeId={office.id} seatId={14} />
                            <ChairV01  officeId={office.id} seatId={15} />
                        </ChairGroup>
                        <TableV01 />
                        <ChairGroup>
                            <ChairV01  officeId={office.id} seatId={16} />
                            <ChairV01  officeId={office.id} seatId={17} />
                            <ChairV01  officeId={office.id} seatId={18} />
                        </ChairGroup>
                    </Pod>
                    <Pod>
                        <ChairGroup>
                            <ChairV01  officeId={office.id} seatId={19} />
                            <ChairV01  officeId={office.id} seatId={20} />
                            <ChairV01  officeId={office.id} seatId={21} />
                        </ChairGroup>
                        <TableV01 />
                        <ChairGroup>
                            <ChairV01  officeId={office.id} seatId={22} />
                            <ChairV01  officeId={office.id} seatId={23} />
                            <ChairV01  officeId={office.id} seatId={24} />
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
