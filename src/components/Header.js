import React, { useEffect, useState } from "react";
import { Menu, Input, Dropdown, Button } from "antd";
import {
  CheckSquareOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../features/category/CategorySlice";
import { useNavigate } from "react-router-dom";
import {
  getProductWC,
  getProductwSearch,
} from "../features/product/ProductSlice";
import { isAuthenticate } from "../utils/localStorage";

import { NavLink } from "react-router-dom";
const { Search } = Input;

const AppHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const onSearch = async (value) => {
    dispatch(getProductwSearch(value));
    navigate("/products");
  };

  const auth = isAuthenticate();
  const userDropdown = auth ? (
    <Menu>
      <Menu.Item key="3">
        <NavLink rel="noopener noreferrer" to="/profile">
          Xin chào {auth.user.name}
        </NavLink>
      </Menu.Item>
      {auth.user.role === 1 ? (
        <Menu.Item key="role">
          <NavLink rel="noopener noreferrer" to="/admin">
            Vào trang admin
          </NavLink>
        </Menu.Item>
      ) : (
        ""
      )}
      <Menu.Item key="4">
        <Button
          rel="noopener noreferrer"
          type="text"
          block
          style={{ textAlign: "left" }}
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
        >
          Đăng xuất
        </Button>
      </Menu.Item>
    </Menu>
  ) : (
    <Menu>
      <Menu.Item key="0">
        <NavLink rel="noopener noreferrer" to="/signin">
          Đăng nhập
        </NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink rel="noopener noreferrer" to="/signup">
          Đăng kí
        </NavLink>
      </Menu.Item>
    </Menu>
  );

  const categories = useSelector((data) => data.category.value);

  const categoryDropdown = (
    <Menu>
      {categories.map((item) => (
        <Menu.Item key={item._id}>
          <Button
            rel="noopener noreferrer"
            block
            type="text"
            onClick={() => {
              dispatch(getProductWC(item._id));
              navigate("/products");
            }}
          >
            {item.name}
          </Button>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="container-fluid">
      <div className="headerw">
        <div className="headerw-item">
          <div
            className="logo"
            style={{ display: "flex", alignItems: "center" }}
          >
            <CheckSquareOutlined />
            <NavLink to="/">TetxG</NavLink>
          </div>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            className="ant-menuu"
          >
            <Menu.Item key="home">
              <NavLink to="/">Home</NavLink>
            </Menu.Item>
            {/* <Dropdown overlay={userDropdown} placement="topRight" arrow>
              <NavLink style={{ marginLeft: "15px" }} to="/products">
                Product
              </NavLink>
            </Dropdown> */}
            <Menu.Item key="product">
              <Dropdown overlay={categoryDropdown} placement="topRight" arrow>
                <NavLink style={{ marginLeft: "15px" }} to="products">
                  Product
                </NavLink>
              </Dropdown>
            </Menu.Item>

            <Menu.Item key="3">Contact</Menu.Item>
            <Menu.Item key="4">About</Menu.Item>
          </Menu>
        </div>

        <div className="headerw-item">
          <Search
            placeholder="San pham can tim kiem"
            onSearch={onSearch}
            style={{ width: "400px" }}
          />

          <Dropdown overlay={userDropdown} placement="topRight" arrow>
            <Button style={{ marginLeft: "15px" }}>
              <UserOutlined />
            </Button>
          </Dropdown>

          <Button style={{ marginLeft: "15px" }}>
            <NavLink to="/cart">
              <ShoppingOutlined />
            </NavLink>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
