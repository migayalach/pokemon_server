import Navbar from "../../components/Navbar/Navbar";
const HomeLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default HomeLayout;
