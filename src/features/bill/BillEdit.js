import React, { useEffect, useRef } from "react";
import { Select, Divider, Form, Button, Input } from "antd";
import { billdt, editBill } from "../../api/bill";
import { useParams, useNavigate } from "react-router-dom";

const BillEdit = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [form] = Form.useForm();
  useEffect(() => {
    const get = async () => {
      const { data } = await billdt(id);
      console.log(data);
      const astt = data.status;
      let stt;
      if (astt === 0) {
        stt = "Chờ xử lý";
      } else if (astt === 1) {
        stt = "Đang xử lý";
      } else if (astt === 2) {
        stt = "Đang giao hàng";
      } else if (astt === 4) {
        stt = " Đã giao hàng";
      }

      form.setFieldsValue({
        status: stt,
        _id: data._id,
        numberst: data.status,
      });
    };
    get();
  }, [id]);

  const onFinish = async (value) => {
    const bill = { status: +value.status, _id: value._id };
    const { data } = await editBill(bill);
    if (data) {
      navigate("/admin/bills");
    }
  };

  return (
    <div>
      <Divider orientation="center">Sửa đơn hàng</Divider>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="status" label="Status">
          <Select placeholder="Assign roles for this user">
            <Select.Option value="0">Chờ xử lý</Select.Option>
            <Select.Option value="1">Đang xử lý</Select.Option>
            <Select.Option value="2">Đang giao hàng</Select.Option>
            <Select.Option value="4">Đã giao hàng</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="_id" name="_id" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item label="numberst" name="numberst" hidden={true}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đồng ý chỉnh sửa
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BillEdit;
