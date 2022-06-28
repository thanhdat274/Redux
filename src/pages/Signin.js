import React from "react";
import { Form, Input, Button, Divider, Row, Col, Modal } from "antd";
import { signin } from "../api/user";
import { useNavigate } from "react-router-dom";
import { authenticate } from "../utils/localStorage";

const Signin = () => {
  const navigate = useNavigate();
  const onFinish = async (value) => {
    console.log(value);
    const { data } = await signin(value);
    if (data) {
      Modal.success({
        title: "Dang nhap thanh cong!",
        onOk: () => {
          authenticate(data, () => {
            navigate("/");
          });
        },
      });

      console.log(data);
    }
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <Row>
        <Col span={6} offset={9}>
          <Divider orientation="center">Dang nhap tai khoan</Divider>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Email user"
              name="email"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password user"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Signin;
