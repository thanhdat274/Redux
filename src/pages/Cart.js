import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Divider, Image, Button, Table, Modal } from "antd";
import {
  PlusSquareOutlined,
  MinusSquareOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { isAuthenticate } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import {
  removeItemCart,
  increaseItem,
  decreaseItem,
} from "../features/cart/CartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataSouces = useSelector((data) => data.cart.value);

  const columns = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (text) => <Image width={100} src={text} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <>
            <Button
              type="text"
              onClick={() => {
                dispatch(increaseItem(record._id));
              }}
            >
              <PlusSquareOutlined />
            </Button>
            <span>{text}</span>
            <Button
              type="text"
              onClick={() => {
                dispatch(decreaseItem(record._id));
              }}
            >
              <MinusSquareOutlined />
            </Button>
          </>
        );
      },
    },

    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        console.log(text._id);
        return (
          <DeleteOutlined
            style={{ color: "red", marginLeft: 12, cursor: "pointer" }}
            onClick={() => {
              Modal.confirm({
                title: `Are you sure delete this product ${record.name}?`,
                okText: "Ok",
                okType: "danger",
                onOk: () => {
                  dispatch(removeItemCart(record._id));
                },
              });
            }}
          />
        );
      },
    },
  ];
  return (
    <div style={{ padding: 50 }}>
      <Row>
        <Col span={12} offset={6}>
          <Divider orientation="center">Cart Product</Divider>
          <Table columns={columns} dataSource={dataSouces} pagination={true} />
          <Button
            block
            type="primary"
            sytle={{ marginTop: 40 }}
            onClick={() => {
              const user = isAuthenticate();
              if (!user) {
                Modal.error({
                  title: "Vui lòng đăng nhập để thanh toán",
                });
                navigate("/signin");
              } else {
                navigate("/checkout");
              }
            }}
          >
            Check Out
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
