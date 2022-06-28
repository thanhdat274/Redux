import React, { useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Input,
  Space,
  Button,
  PageHeader,
  Table,
  Modal,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  SearchOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { isAuthenticate } from "../utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { listBillwUser, removeBill } from "../features/bill/BillSlice";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
const Profile = () => {
  const { Meta } = Card;
  const { user } = isAuthenticate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(listBillwUser(user.id));
  }, []);
  const item = useSelector((data) => data.bill.value);
  const dataSource = item.map((item, index) => {
    const date = moment(item.createdAt).format("HH:mm:ss DD-MM-YYYY");
    return {
      key: index + 1,
      id: item._id,
      name: item.user.name,
      phone: item.phone,
      address: item.address,
      total: item.total,
      status: item.status,
      date: date,
    };
  });

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
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
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },

    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      sorter: (record1, record2) => {
        return record1.total - record2.total;
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        if (text === 0) {
          return <p>Chờ xử lý</p>;
        } else if (text === 1) {
          return <p>Đang xử lý</p>;
        } else if (text === 2) {
          return <p>Đang giao hàng</p>;
        } else if (text === 4) {
          return <p>Đã giao hàng</p>;
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <Space>
            <Link to={`/bills/${record.id}`}>
              <ExclamationCircleOutlined />
            </Link>

            <DeleteOutlined
              style={{ color: "red", marginLeft: 12, cursor: "pointer" }}
              onClick={() => {
                if (text.status !== 0) {
                  return Modal.confirm({
                    title: `Đơn hàng khôngt thể xóa`,
                  });
                } else {
                  Modal.confirm({
                    title: `Are you sure delete this bill ?`,
                    okText: "Ok",
                    okType: "danger",
                    onOk: () => {
                      dispatch(removeBill(text.id));
                    },
                  });
                }
              }}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <div className="site-layout-content">
        <Row>
          <Col span={18} push={6}>
            {" "}
            <PageHeader ghost={false} title="Danh sách đơn hàng"></PageHeader>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={{ pageSize: 9 }}
            />
          </Col>
          <Col span={6} pull={18}>
            <Card
              hoverable
              style={{ width: 240 }}
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => {
                    navigate("/profile/edit");
                  }}
                />,
              ]}
              cover={
                <Avatar
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  icon={<UserOutlined />}
                />
              }
            >
              <Meta title={user.name} description={user.email} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Profile;
