import React from "react";
import { Form, Input, Button, Divider, Row, Col, Modal } from "antd";
import { edit, signup } from "../api/user";
import { useNavigate } from "react-router-dom";
import { isAuthenticate } from "../utils/localStorage";

const ChangeProfile = () => {
  const navigate = useNavigate();
  const onFinish = async (value) => {
    let profile;
    if (value.password) {
      profile = {
        _id: value.id,
        name: value.name,
        email: value.email,
        password: value.password,
      };
    } else {
      profile = {
        _id: value.id,
        name: value.name,
        email: value.email,
      };
    }

    const { data } = await edit(profile);

    if (data) {
      Modal.success({
        title: "Thay đổi thành công!",
      });

      auth.user.email = data.email;
      auth.user.name = data.name;
      localStorage.setItem("user", JSON.stringify(auth));
      navigate("/profile");
    }
  };

  const [form] = Form.useForm();

  const auth = isAuthenticate();
  if (auth) {
    form.setFieldsValue(auth.user);
  }

  return (
    <div style={{ padding: "20px 0" }}>
      <Row>
        <Col span={6} offset={9}>
          <Divider orientation="center">Sửa thông tin người dùng</Divider>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
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

            <Form.Item label="_id" name="id" hidden={true}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Password user"
              name="password"
              rules={[
                {
                  message: "Mật khẩu mới vào đây, nếu bạn muốn đổi mk",
                },
              ]}
            >
              <Input.Password placeholder="Mật khẩu mới vào đây, nếu bạn muốn đổi mk" />
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

export default ChangeProfile;
