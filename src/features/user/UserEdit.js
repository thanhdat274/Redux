import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Form, Input, Button, Select } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { read } from "../../api/user";
import { updateUser } from "./UserSlice";

const CategoryEdit = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams("id");
  console.log(id);
  const [form] = Form.useForm();
  useEffect(() => {
    const getUser = async () => {
      const { data } = await read(id);
      console.log(data.user);
      form.setFieldsValue(data.user);
    };
    getUser();
  }, []);

  const onFinish = (value) => {
    console.log(value);
    dispatch(updateUser(value));
    navigate("/admin/users");
  };
  return (
    <div style={{ width: "700px", margin: "0 auto" }}>
      <Divider orientation="center">Thêm mới danh mục</Divider>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item label="Name user" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email user" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="_id" name="_id" hidden={true}>
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

export default CategoryEdit;
