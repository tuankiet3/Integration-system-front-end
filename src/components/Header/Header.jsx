import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header-logo">LOGO</div>
        <div className="header-tool">
          <div className="header-notification">TB</div>
          <div className="header-user">USER</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
