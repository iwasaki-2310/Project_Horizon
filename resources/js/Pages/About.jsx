import NavBar from '@/Components/NavBar';

const About = props => {
  const { greeting } = props;
  return (
    <>
      <NavBar />
      <h1>About</h1>
      <p>{greeting}</p>
    </>
  );
};

export default About;
