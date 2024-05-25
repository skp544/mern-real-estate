import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
// import { useMutation } from "react-query";
// import { useAuth0 } from "@auth0/auth0-react";

import { Footer, Header } from "../";
// import UserDetailContext from "../../context/UserDetail";
// import { createUser } from "../../utils/api";

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
