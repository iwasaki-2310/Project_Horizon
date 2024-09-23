import Layouts from '@/Layouts/Layouts';
import { Heading, Text } from '@chakra-ui/react';

const About = props => {
  const { greeting } = props;
  return (
    <>
      <Heading as="h2">About</Heading>
      <Text>{greeting}</Text>
    </>
  );
};

About.layout = page => <Layouts>{page}</Layouts>;

export default About;
