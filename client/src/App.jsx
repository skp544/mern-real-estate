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
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
