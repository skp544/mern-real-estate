import { useNavigate } from "react-router-dom";
import "./profileMenu.css";
import { Avatar, Menu } from "@mantine/core";

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate();

  return (
    <Menu>
      <Menu.Target>
        <Avatar
          src={user?.avatar}
          alt="user image"
          radius={"xl"}
          className="duration-200 transition-all hover:scale-110"
        />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={() => navigate("/profile")}>Profile</Menu.Item>
        <Menu.Item onClick={() => navigate("/create-property")}>
          Add Property
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            localStorage.clear();
            logout();
            navigate("/sign-in");
          }}
          className="button"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
