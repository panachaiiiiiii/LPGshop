import type { FormProps, TableProps } from "antd";
import { Button, Form, Input, InputNumber, Space, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import Swal from "sweetalert2";

interface Tp {
  key: number;
  name: string;
  cost: number;
  price: number;
  quantity: number;
}

function Additem_page() {
  const [editForm] = useForm();
  const [forms] = useForm();
  const [tableData, setTableData] = useState<Tp[]>([]);
  const [active, setActive] = useState<boolean>(false);
  const [numkey, setNumKey] = useState<number | undefined>();

  const columns: TableProps["columns"] = [
    { title: "ชื่อ", dataIndex: "name", key: "name" },
    { title: "ต้นทุน", dataIndex: "cost", key: "cost" },
    { title: "ราคาขาย", dataIndex: "price", key: "price" },
    { title: "จำนวน", dataIndex: "number", key: "number" },
    {
      title: "รายละเอียด",
      key: "info",
      render: (_, record) => (
        <Space size="middle">
          <Button
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
            Delete {record.key}
          </Button>

          <Button
            onClick={() => {
              setActive(true);
              setNumKey(record.key);
              editForm.setFieldsValue({
                name: record.name,
                price: record.price,
                cost: record.cost,
                number: record.number,
              });
            }}
          >
            Edit {record.key}
          </Button>
        </Space>
      ),
    },
  ];

  const onFinish: FormProps["onFinish"] = (values) => {
    const L_index = tableData.length;
    forms.resetFields();
    setTableData([
      ...tableData,
      {
        key: L_index === 0 ? 0 : tableData[L_index - 1].key + 1,
        name: values.name,
        cost: values.cost,
        price: values.price,
        quantity: values.number,
      },
    ]);
  };

  const editFinish: FormProps["onFinish"] = (values) => {
    if (numkey !== undefined) {
      setTableData((prevData) =>
        prevData.map((item) =>
          item.key === numkey ? { ...item, ...values } : item
        )
      );
      editForm.resetFields();
      setActive(false);
      setNumKey(undefined);
    }
  };

  return (
    <>
      <Form
        onFinish={onFinish}
        clearOnDestroy={true}
        form={forms}
        className={!active ? "" : "hidden"}
      >
        <div className="md:flex md:justify-center md:space-x-4 md:mx-0 mx-4 ">
          <Form.Item label="ชื่อสินค้า" name="name"rules={[{ required: true, message: "กรอกชื่อสินค้า" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="ต้นทุน" name="cost"rules={[{ required: true, message: "กรอกต้นทุนสินค้า" }]} >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item label="ราคาขาย" name="price"rules={[{ required: true, message: "กรอกราคาขายสินค้า" }]} >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item label="จำนวน" name="number" rules={[{ required: true, message: "กรอกจำนวนสินค้า" }]}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item className="justify-end">
            <Button type="primary" htmlType="submit">
              เพิ่มสินค้า
            </Button>
          </Form.Item>
        </div>
      </Form>

      <Form
        onFinish={editFinish}
        form={editForm}
        className={active ? "" : "hidden"}
      >
        <div className="md:flex md:justify-center md:space-x-4 md:mx-0 mx-4">
          <Form.Item
            label="ชื่อสินค้า"
            name="name"
            
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ต้นทุน"
            name="cost"
            
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item
            label="ราคาขาย"
            name="price"
            
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item
            label="จำนวน"
            name="number"
            
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item className="justify-end">
            <Button type="primary" htmlType="submit">
              แก้ไข
            </Button>
          </Form.Item>
        </div>
      </Form>
      <div className="md:mx-auto container">
        <Table columns={columns} dataSource={tableData} />
      </div>
    </>
  );
}

export default Additem_page;
