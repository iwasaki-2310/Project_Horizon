import NavBar from '@/Components/NavBar';
import { Heading } from '@chakra-ui/react';

const Layouts = ({ children }) => {
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
