import Layouts from '@/Layouts/Layouts';
import { Button, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';

const Welcome = props => {
  const { greeting } = props;
  useEffect(() => {
    console.log('Welcome Page Mounted!!');
  });
  return (
    <>
      <Heading as="h2">{greeting}Welcome Inertia.js</Heading>
      <Button>サンプルボタン</Button>
    </>
  );
};

Welcome.layout = page => <Layouts>{page}</Layouts>;

export default Welcome;
