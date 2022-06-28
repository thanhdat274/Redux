import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticate } from "../utils/localStorage";
import { Modal } from "antd";

const PrivateRouter = ({ children }) => {
  const auth = isAuthenticate();
  console.log(auth);
  if (!auth || auth.user.role == 0) {
    Modal.error({
      title: "Tài khoản không được cấp quyền truy cập admin!!",
      content: "Vui lòng đăng nhập bằng tài khoản admin để vào !",
    });
    return <Navigate to="/signin" />;
  }
  return <>{children}</>;
};

export default PrivateRouter;
