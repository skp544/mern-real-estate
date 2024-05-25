import { useState } from "react";
import "./header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

import { ProfileMenu } from "../";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [menuOpened, setMenuOpened] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // Get the current location object
  const dispatch = useDispatch();

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

    dispatch(deleteUserSuccess());
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
            <Link
              to={`/properties?type=buy`}
              className={isBuyActive ? "active" : ""}
            >
              Properties To Buy
            </Link>
            <Link
              to={`/properties?type=rent`}
              className={isRentActive ? "active" : ""}
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
