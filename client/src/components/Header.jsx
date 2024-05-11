import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation(); // Add useLocation hook to access the current location
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className="  bg-slate-200 shadow-md ">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link
          to={"/"}
          className=" font-bold text-sm sm:text-xl flex gap-1 flex-wrap"
        >
          <span className=" text-slate-500">Dream</span>
          <span className=" text-slate-800">Dwellings</span>
        </Link>
        <form
          className=" bg-slate-100 rounded-lg flex items-center py-2 px-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search..."
            className=" bg-transparent focus:outline-none w-24 md:w-64 sm:w-48"
          />
          <FaSearch className="text-slate-600 hover:text-slate-600/80 duration-200 transition-all cursor-pointer" />
        </form>
        <ul className="flex items-center gap-3 text-lg">
          <li className="nav-link-style hidden sm:inline-block">
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li className="nav-link-style hidden sm:inline-block">
            <NavLink to={"/about"}>About</NavLink>
          </li>
          {currentUser ? (
            <li>
              <Link to={"/profile"}>
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className=" rounded-full h-7 w-7 object-cover"
                />
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-link-style">
                <NavLink to={"/sign-in"}>Sign In</NavLink>
              </li>
              <li className="nav-link-style hidden sm:inline-block">
                <NavLink to={"/sign-up"}>Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
