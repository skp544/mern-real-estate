import { Outlet } from "react-router-dom";
import { Footer, Header } from "../";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-fuchsia-50">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
