import React, { useState } from "react";
import { Form, Input, Button, Divider, Select } from "antd";
import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "./UserSlice";

const CategoryAdd = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (value) => {
    dispatch(addUser(value));
    navigate("/admin/users");
    console.log(value);
  };

  return (
    <div style={{ width: "700px", margin: "0 auto" }}>
      <Divider orientation="center">Thêm mới user</Divider>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Name user" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email user" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password user"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Role user"
          name="role"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Select placeholder="Chon role">
            <Option key={0} value={0}>
              Member
            </Option>
            <Option key={1} value={1}>
              Admin
            </Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Thêm mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CategoryAdd;
