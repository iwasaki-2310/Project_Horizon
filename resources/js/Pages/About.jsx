import Layouts from '@/Layouts/Layouts';
import { Heading, Text } from '@chakra-ui/react';

const About = props => {
  const { greeting } = props;
  return (
    <>
      <Layouts>
        <Heading as="h2">About</Heading>
        <Text>{greeting}</Text>
      </Layouts>
    </>
  );
};

export default About;
