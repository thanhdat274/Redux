import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Form, Input, Button } from "antd";
import { getCategory, updateCategory } from "./CategorySlice";
import { useParams, useNavigate } from "react-router-dom";
import { read } from "../../api/category";

const CategoryEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams("id");
  console.log(id);
  const [form] = Form.useForm();
  useEffect(() => {
    const getCategory = async () => {
      const { data } = await read(id);
      console.log(data);
      console.log(data.category);
      form.setFieldsValue(data);
    };
    getCategory();
  }, []);

  const onFinish = (value) => {
    console.log(value);
    dispatch(updateCategory(value));
    navigate("/admin/categories");
  };
  return (
    <div style={{ width: "700px", margin: "0 auto" }}>
      <Divider orientation="center">Thêm mới danh mục</Divider>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="_id" name="_id" hidden={true}>
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

export default CategoryEdit;
