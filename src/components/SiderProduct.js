import React, { useEffect } from "react";
import { Menu, Button, Divider } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../features/category/CategorySlice";
import { Link, Navigate } from "react-router-dom";
import {
  getProductWC,
  getProductSortaz,
  getProductSortza,
  getPrTangPrice,
  getPrGiamPrice,
} from "../features/product/ProductSlice";

const SiderProduct = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categories = useSelector((data) => data.category.value);
  return (
    <>
      <Menu
        mode="vertical"
        style={{ width: 200, paddingTop: 30 }}
        title="Danh muc san pham"
      >
        <Divider orientation="left">Danh mục sản phẩm</Divider>

        {categories.map((item) => {
          return (
            <Menu.Item key={item._id}>
              <Button
                style={{ textAlign: "left" }}
                type="text"
                onClick={() => {
                  dispatch(getProductWC(item._id));
                }}
                block
              >
                {item.name}
              </Button>
            </Menu.Item>
          );
        })}
      </Menu>

      <Menu
        mode="vertical"
        style={{ paddingTop: 30 }}
        title="Danh muc san pham"
      >
        <Divider orientation="left">Sắp xếp</Divider>
        <Menu.Item>
          <Button
            style={{ textAlign: "left" }}
            type="text"
            onClick={() => {
              dispatch(getProductSortaz());
            }}
            block
          >
            Sắp xếp theo tên <SortAscendingOutlined />
          </Button>
        </Menu.Item>

        <Menu.Item>
          <Button
            style={{ textAlign: "left" }}
            type="text"
            onClick={() => {
              dispatch(getProductSortza());
            }}
            block
          >
            Sắp xếp theo tên <SortDescendingOutlined />
          </Button>
        </Menu.Item>

        <Menu.Item>
          <Button
            style={{ textAlign: "left" }}
            type="text"
            onClick={() => {
              dispatch(getPrTangPrice());
            }}
            block
          >
            Sắp xếp theo giá <ArrowUpOutlined />
          </Button>
        </Menu.Item>

        <Menu.Item>
          <Button
            style={{ textAlign: "left" }}
            type="text"
            onClick={() => {
              dispatch(getPrGiamPrice());
            }}
            block
          >
            Sắp xếp theo giá <ArrowDownOutlined />
          </Button>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default SiderProduct;
