import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listDetail } from "../api/bill";
import { Descriptions, Image, PageHeader, Table } from "antd";
import moment from "moment";

const BillClient = () => {
  const { id } = useParams("id");

  const bills = useSelector((item) => item.bill.value);
  const bill = bills.find((bill) => bill._id === id);

  console.log(bill);

  const [dataSource, setdataSource] = useState([]);

  useEffect(() => {
    const getBillClient = async () => {
      const { data } = await listDetail(id);
      console.log(data);
      setdataSource(data);
    };
    getBillClient();
  }, [id]);

  let stt;
  if (bill.status === 0) {
    stt = "Chờ xử lý";
  } else if (bill.status === 1) {
    stt = "Đang xử lý";
  } else if (bill.status === 2) {
    stt = "Đang giao hàng";
  } else if (bill.status === 4) {
    stt = " Đã giao hàng";
  }

  const columns = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (text) => <Image width={100} src={text} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },

    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  return (
    <div className="site-layout-content">
      <Descriptions title="Thông tin khách hàng">
        <Descriptions.Item label="Tên khách hàng">
          {bill.user.name}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {bill.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Tổng giá:">{bill.total}</Descriptions.Item>
        <Descriptions.Item label="Ngày đặt hàng">
          {moment(bill.createdAt).format("HH:mm:ss DD-MM-YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">{bill.address}</Descriptions.Item>
        <Descriptions.Item label="Trạng thái đơn hàng">{stt}</Descriptions.Item>
      </Descriptions>

      <PageHeader title="List bill product" style={{ padding: "16px 0" }} />
      <Table columns={columns} dataSource={dataSource} pagination={true} />
    </div>
  );
};

export default BillClient;
