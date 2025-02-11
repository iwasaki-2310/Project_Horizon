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
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import Echo from 'laravel-echo';
import { useEffect, useState } from 'react';

const OfficeTop = ({ handlingUserInfo ,office, currentCheckedInUsers, chats }) => {

    window.Pusher = Pusher;
    const echo = new Echo({
        broadcaster: "reverb",
        key: import.meta.env.VITE_REVERB_APP_KEY, // Laravelの設定に合わせて変更
        wsHost: import.meta.env.VITE_REVERB_HOST,    // ブラウザからアクセスする際のホスト名
        wsPort: import.meta.env.VITE_REVERB_PORT,           // コンテナ側でEXPOSEしている WebSocketポート
        wssPort: import.meta.env.VITE_REVERB_PORT,          // HTTPS/SSLを使わないローカルなら実質同じポートでOK
        forceTLS: import.meta.env.VITE_REVERB_FORCE_TLS,        // HTTPSを使用していない場合はfalse
        disableStats: true,
        cluster: import.meta.env.VITE_REVERB_CLUSTER,
        enabledTransports: 'ws'
    });

    const officeImagePath = '/img/office';
    const [seatStatus ,setSeatStatus] = useState({});

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
            <OfficeLayout
                officeName={office.office_name}
                officeId={office.id}
                userId={handlingUserInfo.id}
                users={currentCheckedInUsers}
            >
                <Flex flexWrap="wrap" justifyContent="space-between" alignItems="center" px={5} w="100%" h="100%">
                    <Pod>
                        <ChairGroup>
                            <ChairV01 officeId={office.id} seatId={1} chats={chats} speechBubble={"left"} />
                            <ChairV01 officeId={office.id} seatId={2} chats={chats} speechBubble={"left"} />
                            <ChairV01 officeId={office.id} seatId={3} chats={chats} speechBubble={"left"} />
                            <ChairV01 officeId={office.id} seatId={4} chats={chats} speechBubble={"left"} />
                        </ChairGroup>
                        <TableV01 />
                        <ChairGroup>
                            <ChairV01 officeId={office.id} seatId={5} chats={chats} speechBubble={"right"} />
                            <ChairV01 officeId={office.id} seatId={6} chats={chats} speechBubble={"right"} />
                            <ChairV01 officeId={office.id} seatId={7} chats={chats} speechBubble={"right"} />
                            <ChairV01 officeId={office.id} seatId={8} chats={chats} speechBubble={"right"} />
                        </ChairGroup>
                    </Pod>
                    {/* <Pod>
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
                            <ChairV01  officeId={office.id} seatId={25} />
                            <ChairV01  officeId={office.id} seatId={26} />
                            <ChairV01  officeId={office.id} seatId={27} />
                        </ChairGroup>
                        <TableV01 />
                        <ChairGroup>
                            <ChairV01  officeId={office.id} seatId={28} />
                            <ChairV01  officeId={office.id} seatId={29} />
                            <ChairV01  officeId={office.id} seatId={30} />
                        </ChairGroup>
                    </Pod> */}
                </Flex>

            </OfficeLayout>
        </>
    );
};

export default OfficeTop;
