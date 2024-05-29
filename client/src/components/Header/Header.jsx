import { useState } from "react";
import "./header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

import { ProfileMenu } from "../";
import { useSelector } from "react-redux";
import { signOut } from "../../api/auth";
import toast from "react-hot-toast";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [menuOpened, setMenuOpened] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // Get the current location object

  const getMenuStyles = () => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };

  const handleLogout = async () => {
    const response = await signOut();

    if (!response.success) {
      return toast.error(response.message);
    }

    toast.success(response.message);
    localStorage.clear("token");
    navigate("/sign-in");
  };

  // Determine active state based on query parameters
  const isBuyActive = location.search.includes("type=buy");
  const isRentActive = location.search.includes("type=rent");

  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <Link to={"/"}>
          <img src="./home-white.png" alt="logo" width={100} />
        </Link>
        <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink
              className={"duration-200 transition-all hover:text-blue-primary"}
              to={"/about"}
            >
              About
            </NavLink>
            <Link
              to={`/properties?type=sale`}
              className={`${
                isBuyActive ? "active" : ""
              } hover:text-blue-primary duration-200 transition-all`}
            >
              Properties To Buy
            </Link>
            <Link
              to={`/properties?type=rent`}
              className={`${
                isRentActive ? "active" : ""
              } hover:text-blue-primary duration-200 transition-all`}
            >
              Properties To Rent
            </Link>
            <a href="mailto:iamskp2001@gmail.com">Contact</a>
            {!currentUser ? (
              <button className="button" onClick={() => navigate("/sign-in")}>
                Login
              </button>
            ) : (
              <ProfileMenu user={currentUser} logout={handleLogout} />
            )}
          </div>
        </OutsideClickHandler>
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
