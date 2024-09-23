import Layouts from '@/Layouts/Layouts';
import { Heading, ListItem, UnorderedList } from '@chakra-ui/react';

const Index = props => {
  console.log(props);
  return (
    <Layouts>
      <Heading as="h2">ユーザ一覧</Heading>
      <UnorderedList>
        {props.users.map(user => (
          <>
            <ListItem key={user.id}>{user.display_name}</ListItem>
            <ListItem key={user.id}>{user.email}</ListItem>
            <ListItem key={user.id}>{user.created_at}</ListItem>
          </>
        ))}
      </UnorderedList>
    </Layouts>
  );
};

export default Index;
