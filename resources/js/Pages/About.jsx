const About = props => {
  const { greeting } = props;
  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="/">Welcome</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
      <h1>About</h1>
      <p>{greeting}</p>
    </>
  );
};

export default About;
