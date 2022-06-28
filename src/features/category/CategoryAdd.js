import React, { useState } from "react";
import { Form, Input, Button, Divider, Upload } from "antd";
import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCategory } from "./CategorySlice";

const CategoryAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (value) => {
    dispatch(addCategory(value));
    navigate("/admin/categories");
  };

  return (
    <div style={{ width: "700px", margin: "0 auto" }}>
      <Divider orientation="center">Thêm mới danh mục</Divider>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CategoryAdd;
