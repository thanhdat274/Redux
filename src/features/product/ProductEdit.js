import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Form, Input, Button, Select, Avatar, Upload } from "antd";
// import { updateCategory } from "./CategorySlice";
import { useParams, useNavigate } from "react-router-dom";
import { readWithCateId, edit } from "../../api/product";
import { list } from "../../api/category";
import { getCategories } from "../category/CategorySlice";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { updateProduct } from "./ProductSlice";

const ProductEdit = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [form] = Form.useForm();
  const [fileList, setfileList] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await readWithCateId(id);
      const product = { ...data, cate: data.category.name };
      form.setFieldsValue(product);
      //   console.log(fileList);
    };
    getProduct();

    dispatch(getCategories());
  }, []);

  const categories = useSelector((data) => data.category.value);
  const category = categories.map((item) => {
    return {
      id: item._id,
      cate: item.name,
    };
  });

  const onFinish = async (value) => {
    console.log(value);
    const categoryId = categories.find((c) => c.name === value.cate);
    const file = fileList[0];

    if (file) {
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
      value.img = data.url;
      setfileList([]);
    }
    const prodct = {
      _id: value._id,
      name: value.name,
      price: value.price,
      desc: value.desc,
      img: value.img,
      category: categoryId ? categoryId._id : value.cate,
    };
    console.log(prodct);
    console.log(value);
    dispatch(updateProduct(prodct));

    navigate("/admin/products");
  };

  return (
    <div style={{ width: "700px", margin: "0 auto" }}>
      <Divider orientation="center">Thêm mới san pham</Divider>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item label="_id" name="_id" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên san pham"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Gias san pham"
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
          label="Mô tả sản phẩm"
          name="desc"
          rules={[{ required: true }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Danh mục sản phẩm"
          name="cate"
          rules={[{ required: true }]}
        >
          <Select>
            {category.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.cate}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Anh" name="img" valuePropName="src">
          <Avatar shape="square" size={200} />
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
          <Button type="primary" htmlType="submit" block>
            Lưu sửa
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductEdit;
