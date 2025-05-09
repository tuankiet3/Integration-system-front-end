import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { useDispatch } from "react-redux"; // <-- thêm dòng này
import { logout } from "./AuthSlice";

const useAuthCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          // Token hết hạn
          localStorage.clear();
          dispatch(logout()); // <-- gọi logout Redux
          navigate("/login");
        }
      } catch (error) {
        localStorage.clear();
        dispatch(logout()); // <-- gọi logout Redux
        navigate("/login");
        console.error("Token không hợp lệ:", error);
      }
    } else {
      dispatch(logout()); // <-- gọi logout Redux
      navigate("/login");
    }
  }, [navigate, dispatch]);
};

export default useAuthCheck;
