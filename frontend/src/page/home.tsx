import type { FormProps, TableProps } from "antd";
import { Button, Form, Input, InputNumber, Table } from "antd";
import { useState } from "react";

interface Tp {
  name: string;
  price: number;
  number: number;
}

function HomePage() {
  const columns: TableProps["columns"] = [
    { title: "name", dataIndex: "name", key: "name" },
    { title: "price", dataIndex: "price", key: "price" },
    { title: "number", dataIndex: "number", key: "number" },
  ];

  const [tableData, setTableData] = useState<Tp[]>([]);

  const onFinish: FormProps["onFinish"] = (values) => {
    setTableData([
      ...tableData,
      { name: values.name, price: 222, number: 245 },
    ]);
  };

  return (
    <>
      <Form>
        <div className="md:flex md:justify-center space-x-4 md:mx-0 mx-4">
          <Form.Item label="ชื่อสินค้า" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="ต้นทุน" name="cost">
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item label="ราคาขาย" name="price">
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item label="จำนวน" name="num">
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item className="justify-end">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>

      <Form onFinish={onFinish}>
        <div className="md:flex md:justify-center space-x-4 md:mx-0 mx-4">
          <Form.Item label="ชื่อสินค้า" name="name">
            <Input />
          </Form.Item>
          <Form.Item className="justify-end">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Table columns={columns} dataSource={tableData} />
    </>
  );
}

export default HomePage;
