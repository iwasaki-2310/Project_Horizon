import Layouts from '@/Layouts/Layouts';
import { Heading, Link, ListItem, UnorderedList } from '@chakra-ui/react';

const Index = props => {
  console.log(props);
  return (
    <>
      <Heading as="h2">ユーザ一覧</Heading>
      <Link
        href={route('users.create')}
        display="inline-block"
        bg="teal.500"
        color="white"
        px={4}
        py={2}
        borderRadius="md"
        _hover={{ bg: 'teal.600' }}
      >
        ユーザ登録
      </Link>
      <UnorderedList>
        {props.users.map(user => (
          <>
            <ListItem key={user.id}>{user.display_name}</ListItem>
            <ListItem key={user.id}>{user.email}</ListItem>
            <ListItem key={user.id}>{user.created_at}</ListItem>
          </>
        ))}
      </UnorderedList>
    </>
  );
};

Index.layout = page => <Layouts>{page}</Layouts>;

export default Index;
