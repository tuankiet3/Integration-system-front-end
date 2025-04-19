import React from "react";
import "./Header.scss";
import user from "../../assets/hue.jpg";
import bell from "../../assets/bell.png";
import logo from "../../assets/logo.png";

<<<<<<< HEAD
const Header = () => {
=======
const Header = ({ onIconClick }) => {
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c
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
<<<<<<< HEAD
              <img src={bell} alt="???" />
=======
              <img src={bell} alt="???" onClick={onIconClick} />
>>>>>>> 504e25a29de091e5a9d6cdfb5ed19f4ece79415c
            </div>
          </div>
          <div className="header-user">
            <div className="header-user-img">
              <img src={user} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
