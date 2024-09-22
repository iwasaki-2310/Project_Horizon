import Layouts from '@/Layouts/Layouts';
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
      </Layouts>
    </>
  );
};

export default Welcome;
