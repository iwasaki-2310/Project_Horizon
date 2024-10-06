import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
  //   コンテントコンポーネント
  const DashContent = ({ children }) => {
    return (
      <Box bg="teal.50" pt="5" pb="8" px="4" borderRadius="md" boxShadow="md">
        {children}
      </Box>
    );
  };

  //   コンテントタイトル
  const ContentTitle = ({ children }) => {
    return (
      <Heading as="h2" color="gray.600" fontWeight="bold" size="md">
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

        <Container maxW={'80vw'} py="4" px="0" className="dash-contents">
          <DashContent>
            <ContentTitle>オフィス</ContentTitle>
          </DashContent>
        </Container>
      </AuthenticatedLayout>
    </>
  );
}
