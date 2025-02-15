import NavBar from '@/Components/NavBar';
import { ChatIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, HStack, Image, Input, Link, Text } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import Echo from 'laravel-echo';
import { useEffect, useState } from 'react';

const OfficeLayout = ({ children, officeId, officeName, userId, users }) => {
    const iconsPath = '/icons';
    const officeImagePath = '/img/office';

    const [enteringUsers, setEnteringUsers] = useState(users);
    const [message, setMessage] = useState("");

    window.Pusher = Pusher;
    const echo = new Echo({
        broadcaster: "reverb",
        key: import.meta.env.VITE_REVERB_APP_KEY, // Laravelの設定に合わせて変更
        wsHost: import.meta.env.VITE_REVERB_HOST,    // ブラウザからアクセスする際のホスト名
        wsPort: import.meta.env.VITE_REVERB_PORT,           // コンテナ側でEXPOSEしている WebSocketポート
        wssPort: import.meta.env.VITE_REVERB_PORT,          // HTTPS/SSLを使わないローカルなら実質同じポートでOK
        forceTLS: import.meta.env.VITE_REVERB_FORCE_TLS,        // HTTPSを使用していない場合はfalse
        disableStats: true,
        cluster: import.meta.env.VITE_REVERB_CLUSTER,
        enabledTransports: 'ws'
    });

    /**
    * 退室時にアイコンを削除
    */
    useEffect(() => {
      const channel = window.Echo.private("office_entering_user");

      channel.listen("OfficeUserStatusUpdated", (data) => {
        console.log(data);
        if(data.eventAction === 'join') {
          setEnteringUsers((prevUsers) => {
            if(prevUsers.some(user => user.id === data.user.id)) {
              return prevUsers;
            }
            return [...prevUsers, data.user];
          })
        } else if(data.eventAction === 'leave') {
          setEnteringUsers((prevUsers) => prevUsers.filter(user => user.id !== data.user.id));
        }
      });

      return () => {
        channel.stopListening("OfficeUserStatusUpdated");
      }
    }, [window.Echo]);

    const handleLeaveOffice = (event, officeId, userId) => {
      try {
          const payload = new URLSearchParams();
          payload.append('office_id', officeId);
          payload.append('user_id', userId);
          payload.append('_token', document.querySelector('meta[name="csrf-token"]').content); // CSRFトークンを追加

          // `navigator.sendBeacon`を使用して非同期リクエストを送信
          const url = route('office.leaveOffice', { office_id: officeId, user_id: userId }, true);

          navigator.sendBeacon(url, payload);

          console.log('ビーコンを使用してユーザーの退出処理を送信しました');

          console.log('URL:', url);
          localStorage.setItem('lastURL', `URL: ${url}`);
          localStorage.setItem('lastLog', "ビーコンを使用してユーザーの退出処理を送信しました");
          localStorage.setItem('OfficeID', `OfficeID：${officeId}`);
          localStorage.setItem('UserID', `UserID：${userId}`);

          setTimeout(() => {
              console.log( event.target.href);
              window.location.href = '/dashboard';
          }, 100);
      } catch (error) {
          console.error('ビーコン送信中にエラーが発生しました:', error);
      }
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async(message, officeId, userId) => {
      console.log(userId);
    try {
        const response = await axios.post(route('office.sendMessage', {office_id: officeId, user_id: userId}), {
            message: message
        });
    } catch(error) {
        console.error('メッセージの送信中にエラーが発生しました。', error);
    }
  }


  return (
    <Box h="100vh">
        <Flex as="header" className='bg-slate-900' alignItems="center" justifyContent="space-between" h="60px" px={3}>
            <Flex alignItems="center" justifyContent="space-between">
                <Link
                href='/dashboard'
                onClick={(event) => {
                    handleLeaveOffice(event, officeId, userId);
                    console.log("aaaaaaa");
                }}
                >
                <Image src={`${iconsPath}/app_icon.svg`} alt="logo" w="130px" /></Link>
                <Text as="h1" pb="1px" color="white" ml={3}>{officeName}</Text>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between" pr={3}>
                <Image src={`${iconsPath}/join_users_white.svg`} alt="logo" cursor="pointer" mr={3} w="28px" />
                <Flex>
                {enteringUsers.map((user, index) => (
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
        <Box
            as="main"
            position="relative"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            h="calc(100vh - 60px)"
            bgImage={`url(${officeImagePath}/flooring_2.png)`}
            bgSize="cover"
            bgRepeat="repeat"
        >
            {children}
            <HStack
                mb="30px"
                p="15px"
                w="40%"
                minH="60px"
            >
            <Input
                bg="white"
                placeholder="メッセージを入力..."
                value={message}
                onChange={handleMessage}
            />
            <Button
                colorScheme="blue"
                onClick={() => sendMessage(message, officeId ,userId)}
            >
                送信
            </Button>
            </HStack>
        </Box>
    </Box>
  );
};

export default OfficeLayout;
