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
import ContentSubtlte from '@/Components/DashBoard/ContentSubtlte';
import ContentBody from '@/Components/DashBoard/ContentBody';

export default function Dashboard({ auth, initialOffices, initialPublicOffices, userInfo }) {
    const iconsPath = '/icons';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSerchOfficeModalOpen, setIsSerchOfficeModalOpen] = useState(false);
    const [offices, setOffices] = useState(initialOffices || []);
    const [publicOffices, setPublicOffices] = useState(initialPublicOffices || []);
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

        try {
            const response = await axios.post(
                route('dashboard.createOffice'),
                data
            );
            const newOffice = response.data.office;
            setOffices(prevOffices => [...prevOffices, newOffice]);
            if(newOffice.public_flag === '1') {
                setPublicOffices(prevOffices => [...prevOffices, newOffice]);
            }
            console.log(newOffice);
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
            inputType: 'text',
            label: 'オフィス名',
            name: 'office_name',
            placeHolder: 'オフィスの名前を入力してください',
        },
        {
            inputType: 'text',
            label: 'オフィスURL',
            name: 'office_url',
            placeHolder: '（例）my-office',
        },
        {
            inputType: 'text',
            label: 'オフィス概要',
            name: 'office_description',
            placeHolder: 'オフィスの概要を入力してください',
        },
        {
            inputType: 'selected',
            label: '公開設定',
            options: [
                { label: '公開', value: 1 },
                { label: '非公開', value: 0 },
            ],
            name: 'office_public_flag',
        },
        {
            inputType: 'text',
            label: 'パスワード',
            name: 'office_password',
            placeHolder: 'オフィスのパスワードを入力してください',
        },
    ];

    // useEffect(() => {
    //     const newPublicOffices = offices.filter(office => office.public_flag === "1");
    //     setPublicOffices(prevOffices => [...prevOffices, newPublicOffices]);
    // }, [offices]);
    console.log(publicOffices);


    // オフィスを探すモーダルに渡すカラム名
    const searchOfficeTableCols = ['オフィス名', 'オフィス概要', '参加人数'];
    // オフィスを探すモーダルに渡すテーブルの値
    const searchOfficeTableDatas = publicOffices.map(officeData => ({
        office_name: {
            isAddColumn: true,
            value: officeData.office_name,
        },
        office_description: {
            isAddColumn: true,
            value: officeData.office_description,
        },
        office_public_flag: {
            isAddColumn: false,
            value: officeData.public_flag,
        },
        office_memberCount: {
            isAddColumn: true,
            value: officeData.member_count,
        },
        url: {
            isAddColumn: false,
            value: officeData.office_url,
        }
    }));
    console.log(`searchOfficeTableDatas:${searchOfficeTableDatas}`);


    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <>
                        <Flex>
                            <h3>{userInfo.display_name}</h3>
                            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                                ダッシュボード
                            </h2>
                        </Flex>
                    </>
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
                            iconPath={`${iconsPath}/enter_black.svg`}
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
                        <ContentBody>
                            <ContentSubtlte>入室済みオフィス</ContentSubtlte>
                            <ScrollArea>
                                <UnorderedList>
                                    {offices.map(office => {
                                        return (
                                            <ListItem
                                                key={office.id}
                                                py={3}
                                                pr={6}
                                            >
                                                <Flex justifyContent="space-between">
                                                    <Text fontWeight="bold" color="white">{office?.office_name}</Text>
                                                    <Flex alignItems="center">
                                                        <Link href={`/office/${office.id}`}>
                                                            <Image src={`${iconsPath}/enter_white.svg`} w="25px" cursor="pointer" />
                                                        </Link>
                                                        <LinkIcon ml={4} color="white" />
                                                        <InfoOutlineIcon
                                                            color="white"
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
                        </ContentBody>
                    </DashContent>
                    <DashContent>
                        <ContentTitle>交換した名刺</ContentTitle>
                    </DashContent>
                </DashContainer>
            </AuthenticatedLayout>
        </>
    );
}
