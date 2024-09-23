import NavBar from '@/Components/NavBar';
import { Heading } from '@chakra-ui/react';
import { useEffect } from 'react';

const Layouts = ({ children }) => {
  useEffect(() => {
    console.log('Mount Layout');
    return () => {
      console.log('UnMount Layout');
    };
  }, []);
  return (
    <>
      <header>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          Logo
        </Heading>
        <NavBar />
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layouts;
