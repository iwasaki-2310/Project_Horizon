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
    Image,
    Img,
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
import { BellIcon, InfoIcon, InfoOutlineIcon, LinkIcon } from '@chakra-ui/icons';
import OfficeInfoModal from '@/Components/Modal/InfoModal';
import InfoModal from '@/Components/Modal/InfoModal';
import DashContainer from '@/Components/DashBoard/DashContainer';
import DashContent from '@/Components/DashBoard/DashContent';
import ContentHeader from '@/Components/DashBoard/ContentHeader';
import ScrollArea from '@/Components/DashBoard/ScrollArea';
import ContentTitle from '@/Components/DashBoard/ContentTitle';
import SecondaryButton from '@/Components/SecondaryButton';
import SearchModal from '@/Components/Modal/SearchModal';

export default function Dashboard({ auth, initialOffices }) {
    const iconsPath = '/icons';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSerchOfficeModalOpen, setIsSerchOfficeModalOpen] = useState(false);
    const [offices, setOffices] = useState(initialOffices || []);
    const [newOffice, setNewOffice] = useState(null);
    const [selectedOffice, setSelectedOffice] = useState();
    const [errors, setErrors] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();

    // モーダルオープン
    const showModal = () => {
        setIsModalOpen(true);
    };

    // モーダルクローズ
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // オフィスを探すモーダルオープン
    const showSearchOfficeModal = () => {
        setIsSerchOfficeModalOpen(true);
    };

    // オフィスを探すモーダルクローズ
    const closeshowSearchOfficeModal = () => {
        setIsSerchOfficeModalOpen(false);
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

    // オフィスを探すモーダルに渡すカラム名
    const searchOfficeTableCols = ['オフィス名', 'オフィス概要', '参加人数'];
    // オフィスを探すモーダルに渡すテーブルの値
    const searchOfficeTableDatas = offices.map(officeData => ({
        office_name: officeData.office_name,
        office_description: officeData.office_description,
        office_memberCount: officeData.member_count,
    }))



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
                            <Flex alignItems="center">
                                <ContentTitle>オフィス</ContentTitle>
                            </Flex>
                            <Flex alignItems="center">
                                <SecondaryButton onClick={showSearchOfficeModal}>
                                    オフィスを探す
                                </SecondaryButton>
                                <PrimaryButton onClick={showModal} ml="15px">
                                    オフィスを新規作成
                                </PrimaryButton>
                            </Flex>
                        </ContentHeader>


                        {/* オフィスを探すモーダル */}
                        <SearchModal
                            isOpen={isSerchOfficeModalOpen}
                            onClose={closeshowSearchOfficeModal}
                            modalTitle={'オフィスを探す'}
                            tableColumns={searchOfficeTableCols}
                            tableData={searchOfficeTableDatas}
                            iconPath={`${iconsPath}/enter.png`}
                        />
                        {/* オフィス新規作成モーダル */}
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
                                                <Text fontWeight="bold">{office?.office_name}</Text>
                                                <Flex alignItems="center">
                                                    <Link href={`/office/${office.office_name}`}>
                                                        <Image src={`${iconsPath}/enter.png`} w="40px" cursor="pointer" />
                                                    </Link>
                                                    <LinkIcon ml={2} />
                                                    <InfoOutlineIcon
                                                        cursor="pointer"
                                                        ml={4}
                                                        onClick={() =>
                                                            handleOpenOfficeInfoModal(
                                                                office
                                                            )
                                                        }
                                                    />
                                                </Flex>
                                            </Flex>
                                        </ListItem>
                                    );
                                })}
                                <InfoModal
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
