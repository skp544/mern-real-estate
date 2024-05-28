import { Outlet } from "react-router-dom";
import { Footer, Header } from "../";

const Layout = () => {
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
