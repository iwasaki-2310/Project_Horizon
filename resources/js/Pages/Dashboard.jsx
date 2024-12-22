import Modal from '@/Components/Modal/FormModal';
import ModalInput from '@/Components/Modal/ModalInput';
import ModalInputLabel from '@/Components/Modal/ModalInputLabel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    Heading,
    Link,
    ListItem,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    UnorderedList,
    useDisclosure,
} from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import UserModal from '@/Components/Modal/FormModal';
import FormModal from '@/Components/Modal/FormModal';
import { PrimaryButton } from '@/Components/PrimaryButton';
import axios from 'axios';
import { InfoIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import OfficeInfoModal from '@/Components/Modal/OfficeInfoModal';

export default function Dashboard({ auth, initialOffices }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [offices, setOffices] = useState(initialOffices || []);
    const [newOffice, setNewOffice] = useState(null);
    const [selectedOffice, setSelectedOffice] = useState();
    const [errors, setErrors] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();

    //   全体を囲うラッパー
    const DashContainer = ({ children }) => {
        return (
            <Grid templateColumns="repeat(2,1fr)" gap={6} px={5} py={6}>
                {children}
            </Grid>
        );
    };
    //   コンテントコンポーネント
    const DashContent = ({ children }) => {
        return (
            <Box
                bg="gray.50"
                pt="5"
                pb="8"
                px="4"
                minH="200px"
                maxH="60vh"
                borderRadius="md"
                boxShadow="md"
            >
                {children}
            </Box>
        );
    };

    // コンテントヘッダー
    const ContentHeader = ({ children }) => {
        return (
            <Flex justifyContent="space-between" alignItems="center">
                {children}
            </Flex>
        );
    };
    // コンテントのスクロール部分
    const ScrollArea = ({ children }) => {
        return (
            <Box overflow="scroll" mt="5" h="90%">
                {children}
            </Box>
        );
    };

    //   コンテントタイトル
    const ContentTitle = ({ children }) => {
        return (
            <Heading as="h2" color="gray.600" fontWeight="bold" size="sm">
                {children}
            </Heading>
        );
    };

    //モーダルオープン
    const showModal = () => {
        setIsModalOpen(true);
    };

    //   モーダルクローズ
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async data => {
        console.log('data:', data);

        try {
            const response = await axios.post(
                route('dashboard.createOffice'),
                data
            );
            console.log('response.data:', response);
            const newOffice = response.data.office;
            console.log('newOffice:', newOffice);
            setOffices(prevOffices => [...prevOffices, newOffice]);
            closeModal();
        } catch (error) {
            if (error.response && error.response.status === 500) {
                // バリデーションエラーをモーダルに渡す
                setErrors(error.response.data);
                console.log(error.response.data.error);
            } else {
                console.error('予期しないエラーです。', error);
            }
        }
    };

    // 選択したオフィスのオフィス情報をモーダルに渡す中間関数
    const handleOpenOfficeInfoModal = office => {
        setSelectedOffice(office);
        onOpen();
    };

    const fields = [
        {
            label: 'オフィス名',
            name: 'office_name',
            placeHolder: 'オフィスの名前を入力してください',
        },
        {
            label: 'オフィス概要',
            name: 'office_description',
            placeHolder: 'オフィスの概要を入力してください',
        },
        {
            label: 'パスワード',
            name: 'office_password',
            placeHolder: 'オフィスのパスワードを入力してください',
        },
    ];
    // console.log(offices);

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        ダッシュボード
                    </h2>
                }
            >
                <Head title="Dashboard" />
                <DashContainer>
                    <DashContent>
                        <ContentHeader>
                            <ContentTitle>オフィス</ContentTitle>

                            <PrimaryButton onClick={showModal}>
                                オフィスを新規作成
                            </PrimaryButton>
                        </ContentHeader>

                        <FormModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            modalTitle={'オフィスの新規作成'}
                            fields={fields}
                            onSubmit={handleSubmit}
                            errors={errors}
                        />
                        <ScrollArea>
                            <UnorderedList>
                                {offices.map(office => {
                                    return (
                                        <ListItem
                                            key={office.id}
                                            py={3}
                                            pr={4}
                                            borderBottom="1px solid rgba(128, 128, 128, .2)"
                                            _last={{ borderBottom: 'none' }}
                                        >
                                            <Flex justifyContent="space-between">
                                                <Link href="" fontWeight="bold">
                                                    {office?.office_name}
                                                </Link>
                                                <InfoOutlineIcon
                                                    cursor="pointer"
                                                    onClick={() =>
                                                        handleOpenOfficeInfoModal(
                                                            office
                                                        )
                                                    }
                                                />
                                            </Flex>
                                        </ListItem>
                                    );
                                })}
                                <OfficeInfoModal
                                    isOpen={isOpen}
                                    onClose={onClose}
                                    officeInfo={selectedOffice}
                                />
                            </UnorderedList>
                        </ScrollArea>
                    </DashContent>
                    <DashContent>
                        <ContentTitle>交換した名刺</ContentTitle>
                    </DashContent>
                </DashContainer>
            </AuthenticatedLayout>
        </>
    );
}
