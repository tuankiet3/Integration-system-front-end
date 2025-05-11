import React, { useState } from "react";
import "./Login.scss";
import { Login } from "../../features/Login/LoginAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/Login/AuthSlice";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

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
        else if (response.roles.includes("Hr")) navigate("/HRManagement");
        else navigate("/employee");
      }
    } catch (error) {
      setError("Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-login">
      <LoadingSpinner isLoading={isLoading} />
      <div className="loginBox">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          <button type="submit" className="btn-login" disabled={isLoading}>
            {isLoading ? "Đang đăng nhập..." : "Login"}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default LoginPage;
