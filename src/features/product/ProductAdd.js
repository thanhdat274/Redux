import React from "react";
import {
  Form,
  Divider,
  Input,
  Button,
  Upload,
  Select,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { add } from "../../api/product";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../category/CategorySlice";
import { useNavigate } from "react-router-dom";
import { addProducts } from "./ProductSlice";
import { isAuthenticate } from "../../utils/localStorage";

const ProductAdd = () => {
  const { Option } = Select;
  const [fileList, setfileList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const categories = useSelector((data) => data.category.value);
  console.log(categories);
  const navigate = useNavigate();
  const onFinish = async (value) => {
    console.log(value);

    const file = fileList[0];
    const CLOUDINARY_PRESET = "fl3e89zr";
    const CLOUDINARY_API_URL =
      "https://api.cloudinary.com/v1_1/thaicodejj/image/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
      headers: {
        "Content-Type": "application/form-data",
      },
    });

    const imgLink = data.url;
    setfileList([]);
    const product = { ...value, img: imgLink };
    console.log(product);
    dispatch(addProducts(product));

    navigate("/admin/products");
  };

  // const props = {
  //   onRemove: (file) => {
  //     setfileList([]);
  //   },
  //   beforeUpload: (file) => {
  //     setfileList([...fileList, file]);
  //     return false;
  //   },
  //   fileList,
  // };
  return (
    <div style={{ width: "700px", margin: "0 auto" }}>
      <Divider orientation="center">Thêm mới sản phẩm</Divider>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá sản phẩm"
          name="price"
          rules={[
            { required: true },
            {
              pattern: new RegExp(/^[0-9]+$/),
              message: "Giá phải là số",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Danh mục sản phẩm"
          name="category"
          rules={[{ required: true }]}
        >
          <Select placeholder="Danh mục sản phẩm">
            {categories.map((item) => (
              <Option key={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Mô tả sản phẩm"
          name="desc"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Upload ảnh">
          <Upload.Dragger
            onRemove={(file) => {
              const index = fileList.indexOf(file);
              console.log(file, index);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              return {
                fileList: newFileList,
              };
            }}
            beforeUpload={(file) => {
              setfileList([...fileList, file]);
              return false;
            }}
            defaultFileList={fileList[0]}
            listType="picture"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            disabled={fileList.length === 0}
          >
            Thêm mới
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductAdd;
