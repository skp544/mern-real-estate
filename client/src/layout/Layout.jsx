import { Navigate } from "react-router-dom";
const Layout = ({ children }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default Layout;
