import NavBar from '@/Components/NavBar';

const Layouts = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default Layouts;
