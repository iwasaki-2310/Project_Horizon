import Layouts from '@/Layouts/Layouts';
import { Heading, Text } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';

const About = props => {
  const { greeting } = props;
  return (
    <>
      <Head>
        <title>Aboutページ</title>
        <meta name="description" content="これはAboutページです" />
        <meta name="keywords" content="About" />
      </Head>
      <Heading as="h2">About</Heading>
      <Text>{greeting}</Text>
    </>
  );
};

About.layout = page => <Layouts>{page}</Layouts>;

export default About;
