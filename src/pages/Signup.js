import React from "react";
import { Form, Input, Button, Divider, Row, Col, Modal } from "antd";
import { signup } from "../api/user";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const onFinish = async (value) => {
    console.log(value);
    const { data } = await signup(value);
    if (data) {
      Modal.success({
        title: "Dang ki thanh cong!",
        onOk: () => {
          navigate("/signin");
        },
      });
    }
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <Row>
        <Col span={6} offset={9}>
          <Divider orientation="center">Dang ki tai khoan</Divider>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Name user"
              name="name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

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

export default Signup;
