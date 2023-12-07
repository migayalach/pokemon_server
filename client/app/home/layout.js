import Navbar from "../../Componets/Navbar/Navbar";
const HomeLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default HomeLayout;
