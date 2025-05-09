import React from "react";
import "./Header.scss";
import user from "../../assets/hue.jpg";
import bell from "../../assets/bell.png";
import logo from "../../assets/logo.png";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { logout } from "../../features/Login/AuthSlice";
import { useNavigate } from "react-router-dom";
const Header = ({ onIconClick }) => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispath(logout());
    navigate("/login");
  };
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header-logo">
          <img src={logo} alt="" />
          <div className="logo-text">HMD</div>
        </div>
        <div className="header-tool">
          <div className="header-notification">
            <div className="header-notification-img">
              <img src={bell} alt="???" onClick={onIconClick} />
            </div>
          </div>
          <div className="header-user">
            <div className="header-user-img">
              <img src={user} alt="" />
            </div>
          </div>
          <div className="header-notification" onClick={handleLogout}>
            <CiLogout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
