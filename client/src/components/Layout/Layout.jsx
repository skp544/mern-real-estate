import { Outlet } from "react-router-dom";
import { Footer, Header } from "../";

const Layout = () => {
  return (
    <>
      <div className="relative bg-fuchsia-50 h-full w-full">
        <Header />
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
