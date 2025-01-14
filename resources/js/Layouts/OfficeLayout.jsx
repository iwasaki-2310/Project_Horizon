import NavBar from '@/Components/NavBar';
import { ChatIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';

const OfficeLayout = ({ children, officeName, users }) => {
    const iconsPath = '/icons';
    const officeImagePath = '/img/office';
    useEffect(() => {
        console.log('Mount Layout');
        return () => {
            console.log('UnMount Layout');
        };
    }, []);
  return (
    <Box>
      <Flex as="header" className='bg-slate-900' alignItems="center" justifyContent="space-between" h="60px" px={3}>
        <Flex alignItems="center" justifyContent="space-between">
            <Link href='/dashboard'><Image src={`${iconsPath}/app_icon.svg`} alt="logo" w="130px" /></Link>
            <Text as="h1" pb="1px" color="white" ml={3}>{officeName}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" pr={3}>
            <Image src={`${iconsPath}/join_users_white.svg`} alt="logo" cursor="pointer" mr={3} w="28px" />
            <Flex>
              {users.map((user, index) => (
                <Image
                  key={index}
                  w="30px"
                  h="30px"
                  objectFit="cover"
                  borderRadius="50%"
                  css={{"& + &": {
                    marginLeft: "-10px",
                  }}}
                  src={user.avatar_file_path}
                />
              ))}
            </Flex>
            <ChatIcon display="block" ml={20} color="white" w="28px" cursor="pointer" />
        </Flex>
      </Flex>
      <Box as="main" h="calc(100vh - 60px)" bgImage={`url(${officeImagePath}/flooring_2.png)`} bgSize="cover" bgRepeat="repeat">{children}</Box>
    </Box>
  );
};

export default OfficeLayout;
