import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Input,
  Space,
  Button,
  Divider,
  PageHeader,
  Image,
  Modal,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getProductsCate } from "./ProductSlice";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { removeProduct } from "./ProductSlice";

const Product = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsCate());
  }, []);

  const product = useSelector((data) => data.product.value);
  const dataSource = product.map((item, index) => {
    return {
      key: index + 1,
      id: item._id,
      name: item.name,
      price: item.price,
      desc: item.desc,
      category: item.category.name,
      img: item.img,
    };
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (record1, record2) => {
        return record1.id - record2.id;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div style={{ padding: "10px" }}>
            <Input
              autoFocus
              placeholder="Nhap ten sp!"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
            ></Input>
            <Space style={{ marginTop: "20px" }}>
              <Button
                onClick={() => {
                  confirm();
                }}
                type="primary"
              >
                Tìm kiếm
              </Button>

              <Button
                onClick={() => {
                  clearFilters();
                }}
                type="danger"
              >
                Reset
              </Button>
            </Space>
          </div>
        );
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
        // console.log(record.name.toLowerCase().includes(value.toLowerCase()));
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (record1, record2) => {
        return record1.price - record2.price;
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div style={{ padding: "10px" }}>
            <Input
              autoFocus
              placeholder="Nhap ten danh muc!"
              value={selectedKeys[0]}
              onChange={(e) => {
                console.log(e.target.value);
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
            ></Input>
            <Space style={{ marginTop: "20px" }}>
              <Button
                onClick={() => {
                  confirm();
                }}
                type="primary"
              >
                Tìm kiếm
              </Button>

              <Button
                onClick={() => {
                  clearFilters();
                }}
                type="danger"
              >
                Reset
              </Button>
            </Space>
          </div>
        );
      },
      onFilter: (value, record) => {
        console.log(record);
        return record.category.toLowerCase().includes(value.toLowerCase());
        // console.log(record.name.toLowerCase().includes(value.toLowerCase()));
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
    },
    {
      title: "Desc",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (text) => <Image width={100} src={text} />,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`${record.id}/edit`}>
            <EditOutlined />
          </Link>
          <DeleteOutlined
            style={{ color: "red", marginLeft: 12, cursor: "pointer" }}
            onClick={() => {
              Modal.confirm({
                title: `Are you sure delete this product ${record.name}?`,
                okText: "Ok",
                okType: "danger",
                onOk: () => {
                  dispatch(removeProduct(record.id));
                },
              });
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        ghost={false}
        title="Danh sách sản phẩm"
        extra={[
          <Button key="1" type="primary">
            <Link to={`/admin/products/add`}>Thêm mới sản phẩm</Link>
          </Button>,
        ]}
      ></PageHeader>
      <Divider orientation="left"></Divider>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 9 }}
      />
      ;
    </>
  );
};

export default Product;
