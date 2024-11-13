import type { FormProps, TableProps } from "antd";
import { Button, Form, InputNumber, Select, Space, Table } from "antd";
import { useForm } from "antd/es/form/Form";

import { useState } from "react";
import Swal from "sweetalert2";

interface Tp {
  key: number;
  name: string;
  price: number;
  quantity: number;
}
interface MyItem {
  value: string;
  label: string;
  price: number;
  quantity: number;
}
const iitem: MyItem[] = [
  { value: "lucy", label: "Lucy", price: 2, quantity: 24 },
  { value: "lucy2", label: "Lucy2", price: 2, quantity: 24 },
  { value: "lucy3", label: "Lucy3", price: 2, quantity: 24 },
];

function HomePage() {
  const [formss] = useForm();
  const [tableData, setTableData] = useState<Tp[]>([]);


  const onFinish: FormProps["onFinish"] = (values) => {
    const itemfinded = iitem.filter((iitem) => iitem.value === values.value);
    const L_index = tableData.length;
    setTableData([
      ...tableData,
      {
        key: L_index === 0 ? 0 : tableData[L_index - 1].key + 1,
        name: itemfinded[0].value,
        price: itemfinded[0].price,
        quantity: values.number,
      },
    ]);
    formss.resetFields();
  };
  const columns: TableProps["columns"] = [
    { title: "name", dataIndex: "name", key: "name" },
    { title: "price", dataIndex: "price", key: "price" },
    { title: "quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "รายละเอียด",
      key: "info",
      render: (_, record) => (
        <Space size="middle">
          <Button
            danger
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                if (result.isConfirmed) {
                  const new_data = tableData.filter(
                    (data) => data.key !== record.key
                  );
                  setTableData(new_data);
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                }
              });
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Form onFinish={onFinish} form={formss}>
        <div className="md:flex md:justify-center md:space-x-4 md:mx-0 mx-4">
          <Form.Item
            label="ชื่อสินค้า"
            name="value"
            rules={[{ required: true, message: "กรอกชื่อสินค้า" }]}
          >
            <Select
              style={{ width: 200 }}
              allowClear
              options={iitem}
              placeholder="select it"
            />
          </Form.Item>
          <Form.Item
            label="จำนวน"
            name="number"
            style={{ width: 200 }}
            rules={[{ required: true, message: "กรอกจำนวนสินค้า" }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item className="justify-end">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
      <div className="px-3 sm:px-6 md:mx-auto container">
        <Table columns={columns} dataSource={tableData} />
      </div>
      <div className="px-3 sm:px-6 md:mx-auto container my-4 justify-end flex space-x-6">
        <p>
          รวมทั้งหมด{" "}
          {tableData.reduce((totals, acc) => totals + acc.price * acc.quantity,0)}
        </p>
        <Button disabled={tableData.length < 1} type="primary">
          ยืนยันการซื้อสินค้า
        </Button>
      </div>
    </>
  );
}

export default HomePage;
