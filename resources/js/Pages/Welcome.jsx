import NavBar from '@/Components/NavBar';
import { Link, Head } from '@inertiajs/react';
import { useEffect } from 'react';

const Welcome = props => {
  const { greeting } = props;
  useEffect(() => {
    console.log('Welcome Page Mounted!!');
  });
  return (
    <>
      <NavBar />
      <h1>{greeting}Welcome Inertia.js</h1>
    </>
  );
};

export default Welcome;
