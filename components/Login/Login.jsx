import React, { useState } from "react";
import "./Login.scss";
import video from "../../assets/video.mp4";
import { Login } from "../../features/Login/LoginAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/Login/AuthSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Login(email, password);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: response.username,
            roles: response.roles,
          })
        );
        dispatch(
          loginSuccess({
            token: response.token,
            roles: response.roles,
          })
        );
        if (response.roles.includes("Admin")) navigate("/");
        else if (response.roles.includes("PayrollManagement"))
          navigate("/payroll");
        else if (response.roles.includes("HR")) navigate("/hr");
        else navigate("/employee");
      }
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="container-login">
      <video
        className="videoBg"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
      >
        <source src={video} />
      </video>
      <div className="loginBox">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="options">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />{" "}
              Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account? <a href="#">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
