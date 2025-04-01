import React from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header-container">
      <div className="header-content">
        <div className="header-logo" onClick={() => navigate("/")}>
          LOGO
        </div>
        <div className="header-tool">
          <div className="header-notification">TB</div>
          <div className="header-user">USER</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
