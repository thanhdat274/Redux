import React from "react";
import { Layout, Breadcrumb, Button } from "antd";
import Adminsidebar from "../../components/Adminsidebar";
import { Outlet } from "react-router-dom";
import { isAuthenticate } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { Header, Content, Footer } = Layout;
  const { user } = isAuthenticate();
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Adminsidebar />
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: "0 20px 0 0",
              textAlign: "right",
              color: "white",
            }}
          >
            <div>
              Xin chào! {""}
              <span
                style={{
                  color: "blue",
                  paddingRight: "4px",
                }}
              >
                {user.name}
              </span>
              |
              <Button
                type="text"
                style={{ color: "white" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Về trang Web
              </Button>
              |
              <Button
                type="text"
                style={{ color: "white" }}
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/");
                }}
              >
                Đăng xuất
              </Button>
            </div>
          </Header>
          <Content style={{ margin: "0 16px", padding: "20px" }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Thai
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;
