import { Route, Routes } from "react-router-dom";
import { Header, PrivateRoute } from "./components";
import {
  About,
  CreateListing,
  Home,
  Listing,
  Profile,
  Search,
  Signin,
  Signup,
  UpdateListing,
} from "./pages";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/create-listing"
            element={
              <Layout>
                <CreateListing />
              </Layout>
            }
          />
          <Route
            path="/update-listing/:listingId"
            element={
              <Layout>
                <UpdateListing />
              </Layout>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
