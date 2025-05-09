import React from "react";

const DashBoard = () => {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  console.log(user);
  return <div>Đăng nhập với tư cách ADMIN</div>;
};

export default DashBoard;
