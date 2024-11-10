import Modal from '@/Components/Modal/FormModal';
import ModalInput from '@/Components/Modal/ModalInput';
import ModalInputLabel from '@/Components/Modal/ModalInputLabel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Box, Button, Container, Grid, Heading, Text } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import UserModal from '@/Components/Modal/FormModal';
import FormModal from '@/Components/Modal/FormModal';
import { PrimaryButton } from '@/Components/PrimaryButton';

export default function Dashboard({ auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                borderRadius="md"
                boxShadow="md"
            >
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

    const fields = [
        {
            label: 'オフィス名',
            name: 'office_name',
            placeHolder: 'オフィスの名前を入力してください',
        },
        {
            label: 'オフィス概要',
            name: 'office_desc',
            placeHolder: 'オフィスの概要を入力してください',
        },
        {
            label: 'パスワード',
            name: 'office_password',
            placeHolder: 'オフィスのパスワードを入力してください',
        },
    ];

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
                        <ContentTitle>オフィス</ContentTitle>
                        <PrimaryButton onClick={showModal}>
                            オフィスを新規作成
                        </PrimaryButton>
                        <FormModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            modalTitle={'オフィスの新規作成'}
                            fields={fields}
                            submitUrl={'/save-data'}
                        />
                    </DashContent>
                    <DashContent>
                        <ContentTitle>交換した名刺</ContentTitle>
                    </DashContent>
                </DashContainer>
            </AuthenticatedLayout>
        </>
    );
}
