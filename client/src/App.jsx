import "./App.css";
import { Homepage, PageNotFound, Properties, Property } from "./pages";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CreateProperty from "./pages/CreateProperty";
import SearchPropertiesForLocation from "./pages/SearchPropertiesForLocation";
import ShowUserProperty from "./pages/ShowUserProperty";
import About from "./pages/About";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/create-property" element={<CreateProperty />} />
        <Route
          path="/properites/location"
          element={<SearchPropertiesForLocation />}
        />
        <Route path="/user-property" element={<ShowUserProperty />} />
        <Route path="/about" element={<About />} />
        <Route path="/properties">
          <Route index element={<Properties />} />
          <Route path=":id" element={<Property />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/sign-up" element={<Signup />} />
    </Routes>
  );
};

export default App;
