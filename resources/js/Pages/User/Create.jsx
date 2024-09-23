import Layouts from '@/Layouts/Layouts';
import { Heading } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';

const Create = () => {
  return (
    <>
      <Head title="ユーザー登録"></Head>
      <Heading as="h2">ユーザーの登録</Heading>
    </>
  );
};

Create.layout = page => <Layouts>{page}</Layouts>;

export default Create;
