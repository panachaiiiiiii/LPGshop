import { Button, Checkbox, Form, Input, InputNumber, Table } from "antd";
import type { TableProps } from "antd";
import { useState } from "react";
import type { FormProps } from "antd";

type Tp = [{ name?: string }];
function Additem_page() {
  const columns: TableProps["columns"] = [
    { title: "name", dataIndex: "name", key: "name" },
  ];

  const [test, settest] = useState("2");
  const d = [{ name: "a" }];

  const onFinish: FormProps["onFinish"] = (values) => {
    console.log("Success:", values);
    d.push(values);
    settest("2");
    console.log(t)
    console.log("Success:", d);
  };
  return (
    <>
      <Form>
        <div className="md:flex md:justify-center space-x-4 md:mx-0 mx-4">
          <Form.Item label="ชื่อสินค้า" name="name">
            <Input></Input>
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
            <Input></Input>
          </Form.Item>
          <Form.Item className="justify-end">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Table columns={columns} dataSource={d} />
    </>
  );
}

export default Additem_page;
