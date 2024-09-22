import Layouts from '@/Layouts/Layouts';

const About = props => {
  const { greeting } = props;
  return (
    <>
      <Layouts>
        <h1>About</h1>
        <p>{greeting}</p>
      </Layouts>
    </>
  );
};

export default About;
