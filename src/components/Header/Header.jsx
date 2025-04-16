import React from "react";
import "./Header.scss";
import user from "../../assets/hue.jpg";
import bell from "../../assets/bell.png";
import logo from "../../assets/logo.png";


const Header = () => {
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
             
               <img src={bell} alt="???"  /> 
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
