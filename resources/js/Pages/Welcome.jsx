import Layouts from '@/Layouts/Layouts';
import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';

const Welcome = props => {
  const { greeting } = props;
  useEffect(() => {
    console.log('Welcome Page Mounted!!');
  });
  return (
    <>
      <Layouts>
        <h1>{greeting}Welcome Inertia.js</h1>
        <Button>サンプルボタン</Button>
      </Layouts>
    </>
  );
};

export default Welcome;
