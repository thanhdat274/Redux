import React, { useEffect, useRef } from "react";
import {
  Layout,
  Typography,
  Image,
  Row,
  Col,
  Form,
  Input,
  Button,
  Modal,
} from "antd";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../features/product/ProductSlice";
import { read } from "../api/product";
import { addToCart } from "../features/cart/CartSlice";

const ProductDetail = () => {
  const { Content } = Layout;
  const { Title, Paragraph } = Typography;
  const dispatch = useDispatch();
  const { id } = useParams("id");
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const [form] = Form.useForm();
  const pro = useSelector((data) => data.product.value);
  const item = pro.find((item) => item._id === id);
  console.log(item);

  const onfinish = async (value) => {
    const { data } = await read(id);
    const product = {
      ...data,
      quantity: +value.quantity ? +value.quantity : 1,
    };
    dispatch(addToCart(product));
    Modal.success({
      title: "Them thanh cong vao gio hang",
    });
  };

  return (
    <div>
      <Content style={{ padding: "50px" }}>
        <Row>
          <Col span={12} style={{ textAlign: "center" }}>
            <Image src={item.img} width={600} />
          </Col>
          <Col span={12}>
            <Typography>
              <Title level={2}>Tên sản phẩm: {item.name}</Title>
              <Title level={4}>Giá: {item.price} vnđ</Title>
              <Paragraph>
                <Title level={4}>Mô tả: </Title> {item.desc}
              </Paragraph>
            </Typography>

            <Form
              form={form}
              onFinish={onfinish}
              initialValues={{ quantity: "1" }}
              layout="vertical"
            >
              <Form.Item name="quantity" label="Số lượng sản phẩm:">
                <Input width={300} maxLength="100px" />
              </Form.Item>
              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Add to cart
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </div>
  );
};

export default ProductDetail;
