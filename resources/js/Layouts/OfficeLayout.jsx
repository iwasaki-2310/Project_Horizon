import NavBar from '@/Components/NavBar';
import { ChatIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

const OfficeLayout = ({ children, officeName }) => {
    const iconsPath = '/icons';
    useEffect(() => {
        console.log('Mount Layout');
        return () => {
            console.log('UnMount Layout');
        };
    }, []);
  return (
    <>
      <Flex as="header" className='bg-slate-900' alignItems="center" justifyContent="space-between" py={4} px={3}>
        <Flex alignItems="center" justifyContent="space-between">
            <Image src={`${iconsPath}/join_users_white.svg`} alt="logo" w="28px" />
            <Text as="h1" color="white" ml={3}>{officeName}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" pr={3}>
            <Image src={`${iconsPath}/join_users_white.svg`} alt="logo" mr={3} w="28px" />
            <ChatIcon display="block" color="white" w="28px" />
        </Flex>
      </Flex>
      <main>{children}</main>
    </>
  );
};

export default OfficeLayout;
