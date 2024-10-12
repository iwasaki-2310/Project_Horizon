import Modal from '@/Components/Modal/Modal';
import ModalInput from '@/Components/Modal/ModalInput';
import ModalInputLabel from '@/Components/Modal/ModalInputLabel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Box, Container, Grid, Heading, Text } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
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
        bg="teal.50"
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
            <Modal>
              <ModalInputLabel>オフィス名</ModalInputLabel>
              <ModalInput />
              <ModalInputLabel>パスワード</ModalInputLabel>
              <ModalInput />
              <ModalInputLabel>オフィス概要</ModalInputLabel>
              <ModalInput />
            </Modal>
          </DashContent>
          <DashContent>
            <ContentTitle>交換した名刺</ContentTitle>
          </DashContent>
        </DashContainer>
      </AuthenticatedLayout>
    </>
  );
}
