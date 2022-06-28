import React, { useEffect, useState } from "react";
import { Table, Divider, Space, Button, PageHeader, Modal, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, removeUser } from "./UserSlice";
import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const Category = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users = useSelector((data) => data.user.value);
  console.log(users);
  const dataSource = users.map((item, index) => {
    return {
      key: index + 1,
      id: item._id,
      name: item.name,
      email: item.email,
      role: item.role,
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => {
        if (text === 0) {
          return <p>Member</p>;
        } else if (text === 1) {
          return <p>Admin</p>;
        }
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
                title: `Are you sure delete this user: ${record.name}?`,
                okText: "Ok",
                okType: "danger",
                onOk: () => {
                  dispatch(removeUser(record.id));
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
            <Link to={`/admin/user/add`}>Thêm mới user</Link>
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
