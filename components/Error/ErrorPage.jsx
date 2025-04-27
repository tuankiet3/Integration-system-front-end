import React, { useState, useEffect } from "react";
import giaiphong from "../../assets/giaiphong.jpg";
import "./ErrorPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/Login/AuthSlice";

const ErrorPage = () => {
  const [hoverBack, setHoverBack] = useState(false);
  const [hoverLogin, setHoverLogin] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const location = useLocation();
  const error = location.state?.error || "An unknown error occurred.";
  const navigate = useNavigate();
  const dispath = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleBackClick = () => {
    if (window.history.length > 2) {
      window.history.go(-2);
    } else {
      navigate("/login");
    }
  };

  const getErrorMessage = () => {
    if (error.includes("Network Error")) {
      return "Lỗi Mạng!";
    }
    if (error.includes("404")) {
      return "Không tìm thấy trang!";
    }
    if (error.includes("500")) {
      return "Lỗi Server!";
    }
    if (error.includes("403")) {
      return "Truy cập bị từ chối!";
    }
    if (error.includes("401")) {
      return "Bạn không có quyền truy cập!";
    } else {
      return "Có lỗi bất ngờ xảy ra!";
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispath(logout());
    navigate("/login");
  };
  return (
    <div className={`error-page-wrapper ${fadeIn ? "fade-in" : "fade-out"}`}>
      <div className="error-card">
        <img src={giaiphong} alt="Funny Error Cat" className="error-image" />
        <h1 className="error-code">{getErrorMessage()}</h1>
        <h2>!!!</h2>
        {error.includes("401") ? (
          <>
            <button
              key="relogin-1"
              onClick={handleBackClick}
              onMouseEnter={() => setHoverBack(true)}
              onMouseLeave={() => setHoverBack(false)}
              className={`error-button ${hoverBack ? "hover1" : ""}`}
            >
              Quay lại trang trước
            </button>

            <button
              key="relogin-2"
              onClick={handleLogout}
              onMouseEnter={() => setHoverLogin(true)}
              onMouseLeave={() => setHoverLogin(false)}
              className={`error-button ${hoverLogin ? "hover" : ""}`}
            >
              Đăng nhập lại nhé
            </button>
          </>
        ) : (
          <button
            onClick={handleBackClick}
            onMouseEnter={() => setHoverBack(true)}
            onMouseLeave={() => setHoverBack(false)}
            className={`error-button ${hoverBack ? "hover" : ""}`}
          >
            Quay lại trang trước
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
