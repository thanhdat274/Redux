import React, { useEffect, useState } from "react";
import { Table, Divider, Space, Button, PageHeader, Modal, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getCategories, removeCategories } from "./CategorySlice";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const Category = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categories = useSelector((data) => data.category.value);
  console.log(categories);
  const dataSource = categories.map((item, index) => {
    return {
      key: index + 1,
      id: item._id,
      name: item.name,
    };
  });

  const columns = [
    {
      title: "Id",
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
        console.log(selectedKeys);
        return (
          <div style={{ padding: "10px" }}>
            <Input
              autoFocus
              placeholder="Nhap ten danh muc!"
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
                title: `Are you sure delete this category ${record.name}?`,
                okText: "Ok",
                okType: "danger",
                onOk: () => {
                  dispatch(removeCategories(record.id));
                },
              });
            }}
          />
        </Space>
      ),
    },
  ];
  return (
    <div style={{ padding: "20px" }}>
      <PageHeader
        ghost={false}
        title="Danh sách loại hàng"
        extra={[
          <Button key="1" type="primary">
            <Link to={`/admin/categories/add`}>Thêm mới loại hàng</Link>
          </Button>,
        ]}
      ></PageHeader>
      <Divider orientation="left"></Divider>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 9 }}
      />
    </div>
  );
};

export default Category;
