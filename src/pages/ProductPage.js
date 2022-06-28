import React, { useEffect } from "react";
import SiderProduct from "../components/SiderProduct";
import { useSelector, useDispatch } from "react-redux";
import { List, Divider, Card, Space, Button, Layout, Modal } from "antd";
import { getProducts } from "../features/product/ProductSlice";
import { Link } from "react-router-dom";
import { read } from "../api/product";
import { addToCart } from "../features/cart/CartSlice";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
const ProductPage = () => {
  const dispatch = useDispatch();
  const { Meta } = Card;
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const products = useSelector((data) => data.product.value);
  const dataSource = products;

  const { Sider, Content } = Layout;
  return (
    <div>
      <Layout>
        <Sider style={{ backgroundColor: "white" }} width={200}>
          <SiderProduct />
        </Sider>
        <Content
          style={{
            padding: "20px 50px",
            backgroundColor: "white",
          }}
        >
          <Divider orientation="center">Product List</Divider>
          <List
            grid={{ gutter: [1, 8], column: 4, align: "middle" }}
            style={{ padding: "30px" }}
            dataSource={dataSource}
            pagination={{ pageSize: 8 }}
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
                      <Link to={`/products/${item._id}`}>
                        <EyeOutlined />
                      </Link>
                    </Button>
                    <Button
                      style={{ width: 88 }}
                      width={100}
                      type="primary"
                      onClick={async () => {
                        const { data } = await read(item._id);
                        const product = { ...data, quantity: 1 };
                        dispatch(addToCart(product));
                        Modal.success({
                          title: "Them thanh cong vao gio hang",
                        });
                      }}
                    >
                      <ShoppingCartOutlined />
                    </Button>
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </div>
  );
};

export default ProductPage;
