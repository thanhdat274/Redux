import React, { useState, useRef, useEffect } from "react";
import {
  Row,
  Col,
  Divider,
  Image,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Space,
} from "antd";
import {
  PlusSquareOutlined,
  MinusSquareOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { isAuthenticate } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { creat, creatbilldt } from "../api/bill";
import { useSelector, useDispatch } from "react-redux";
import { reCart, removeItemCart } from "../features/cart/CartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { user } = isAuthenticate();
  if (user) {
    form.setFieldsValue(user);
  }
  const navigate = useNavigate();
  const cart = useSelector((data) => data.cart.value);
  console.log(cart);
  const dataSource = cart.map((item, index) => {
    return {
      key: index + 1,
      id: item._id,
      name: item.name,
      img: item.img,
      price: item.price,
      quantity: item.quantity,
      total: item.total,
    };
  });

  let tongthanhtien = 0;
  cart.forEach((item) => {
    tongthanhtien += item.total;
  });

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
            <span>{text}</span>
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
        return (
          <DeleteOutlined
            style={{ color: "red", marginLeft: 12, cursor: "pointer" }}
            onClick={() => {
              Modal.confirm({
                title: `Are you sure delete this product ${record.name}?`,
                okText: "Ok",
                okType: "danger",
                onOk: () => {
                  dispatch(removeItemCart(record.id));
                },
              });
            }}
          />
        );
      },
    },
  ];

  const onFinish = async (value) => {
    const bill = {
      user: value.id,
      address: value.address,
      phone: value.phone,
      total: tongthanhtien,
    };
    const { data } = await creat(bill);

    dataSource.map(async (item) => {
      const billdetail = {
        user: value.id,
        product: item._id,
        img: item.img,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.total,
        bill: data._id,
      };
      await creatbilldt(billdetail);
    });
    Modal.success({
      title:
        "Checkout thành công, Chúng tôi sẽ liên hệ với quý khách trong ít phút để xác nhận đơn hàng",
    });
    dispatch(reCart());
    navigate("/");
  };
  return (
    <div style={{ padding: 50 }}>
      <Divider orientation="center">Checkout Product</Divider>
      <Row>
        <Col span={12} style={{ padding: "0 20px" }}>
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item
              label="User name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="id" name="id" hidden={true}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Đồng ý thanh toán
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12} style={{ padding: "0 20px" }}>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
          <Row style={{ marginTop: "40px" }}>
            <Col
              span={12}
              style={{
                fontSize: "20px",
              }}
            >
              Tổng thành tiền :
            </Col>
            <Col
              span={12}
              style={{
                textAlign: "right",
                paddingRight: "40px",
                fontSize: "20px",
                color: "red",
              }}
            >
              {tongthanhtien}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;
