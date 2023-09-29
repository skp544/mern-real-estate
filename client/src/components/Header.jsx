import { Link } from "react-router-dom";
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
            className=" bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600 hover:text-slate-600/80 duration-200 transition-all cursor-pointer" />
        </form>
        <ul className="flex items-center gap-4 text-lg">
          <li className="nav-link-style hidden sm:inline-block">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="nav-link-style hidden sm:inline-block">
            <Link to={"/about"}>About</Link>
          </li>
          <li className="nav-link-style">
            <Link to={"/sign-in"}>Sign In</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
