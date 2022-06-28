import React, { useEffect } from "react";
import Banner from "../components/Banner";
import { useSelector, useDispatch } from "react-redux";
import { List, Divider, Card, Space, Button, Modal } from "antd";
import { getProducts } from "../features/product/ProductSlice";
import { Link, useParams } from "react-router-dom";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { read } from "../api/product";
import { addToCart } from "../features/cart/CartSlice";

const Homepage = () => {
  const dispatch = useDispatch();
  const { Meta } = Card;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const products = useSelector((data) => data.product.value);
  const dataSource = products;

  return (
    <>
      <Banner />

      <Divider orientation="center">Sản phẩm mới ra mắt</Divider>

      <List
        grid={{ gutter: [8, 8], column: 5, align: "middle" }}
        style={{ padding: "30px" }}
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <Card
              bordered={true}
              hoverable
              style={{ width: 240 }}
              cover={<img alt={item.name} src={item.img} />}
            >
              <Space align="start" size={30}>
                <Meta title={item.name} description={item.desc} />
                <Meta title={item.price + ` vnđ`} />
              </Space>

              <Space style={{ marginTop: 20 }} size={15}>
                <Button style={{ width: 88 }}>
                  <Link to={`products/${item._id}`}>
                    <EyeOutlined />
                  </Link>
                </Button>
                <Button
                  style={{ width: 88 }}
                  onClick={async () => {
                    const { data } = await read(item._id);
                    const product = {
                      ...data,
                      quantity: 1,
                    };
                    dispatch(addToCart(product));
                    Modal.success({
                      title: "Them thanh cong vao gio hang",
                    });
                  }}
                  width={100}
                  type="primary"
                >
                  <ShoppingCartOutlined />
                </Button>
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default Homepage;
