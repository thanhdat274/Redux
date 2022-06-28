import React from "react";
import { Menu, Layout } from "antd";
import {
  DropboxOutlined,
  CheckOutlined,
  UserOutlined,
  SwitcherOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Adminsidebar = () => {
  const { SubMenu } = Menu;
  const { Sider } = Layout;
  return (
    <>
      <Sider collapsible>
        <div
          className="logo"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <a
            style={{
              color: "white",
              paddingBottom: "20px",
              paddingTop: "20px",
              paddingLeft: "10px",
            }}
            href="/admin"
          >
            T H A I X
          </a>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <SubMenu key="sub1" icon={<DropboxOutlined />} title="Products">
            <Menu.Item key="3">
              <Link to="/admin/products">Danh sách sản phẩm</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/admin/products/add">Thêm sản phẩm</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<SwitcherOutlined />} title="Categorys">
            <Menu.Item key="6">
              <Link to="/admin/categories">Danh sách loại hàng</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="categories/add">Thêm loại hàng</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<UserOutlined />} title="Users">
            <Menu.Item key="7">
              <Link to="/admin/users">Danh sách user</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="users/add">Thêm user</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="sub4" icon={<CheckOutlined />} title="Bills">
            <Menu.Item key="10">
              <Link to="/admin/bills">Danh sách bill</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </>
  );
};

export default Adminsidebar;
