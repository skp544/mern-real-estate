import { Link, NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header className="  bg-slate-200 shadow-md ">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link
          to={"/"}
          className=" font-bold text-sm sm:text-xl flex gap-1 flex-wrap"
        >
          <span className=" text-slate-500">Real</span>
          <span className=" text-slate-700">Estate</span>
        </Link>
        <form className=" bg-slate-100 rounded-lg flex items-center py-2 px-4">
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
          <li className="nav-link-style">
            <NavLink to={"/sign-in"}>Sign In</NavLink>
          </li>
          <li className="nav-link-style hidden sm:inline-block">
            <NavLink to={"/sign-up"}>Sign Up</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
