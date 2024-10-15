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
  number: number;
}

function Additem_page() {
  const [editForm] = useForm();
  const [forms] = useForm();
  const [tableData, setTableData] = useState<Tp[]>([]);
  const [active, setactive] = useState<boolean>(false);
  const [numkey, setnumkey] = useState<number>();
  const columns: TableProps["columns"] = [
    { title: "ชื่อ", dataIndex: "name", key: "name" },
    { title: "ต้นทุน", dataIndex: "cost", key: "cost" },
    { title: "ราคาขาย", dataIndex: "price", key: "price" },
    { title: "จำนวนตงเหลือ", dataIndex: "number", key: "number" },
    {
      title: "รายละเอียด",
      key: "info",
      render: (_, record) => (
        <Space size="middle">
          <Button
            id={record.key}
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
                  let new_data = tableData.filter(
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
            Delete{record.key}
          </Button>

          <Button
            id={record.key}
            onClick={() => {
              setactive(false);
              setnumkey(record.key);
              editForm.setFieldsValue({
                name: record.name,
                price: record.price,
                cost: record.cost,
                number: record.number,
              });
              setactive(true);
            }}
          >
            Edit{record.key}
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
        key: L_index == 0 ? 0 : tableData[L_index - 1].key + 1,
        name: values.name,
        cost: values.cost,
        price: values.price,
        number: values.number,
      },
    ]);
  };

  const editFinish: FormProps["onFinish"] = (values) => {
    editForm.resetFields();
    console.log(values.key);
  };

  return (
    <>
      <Form onFinish={onFinish} clearOnDestroy={true} form={forms}>
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
          <Form.Item label="จำนวน" name="number">
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
        className={active == true ? "" : "hidden"}
      >
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
          <Form.Item label="จำนวน" name="number">
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item className="justify-end">
            <Button type="primary" htmlType="submit">
              แก้ไข
            </Button>
          </Form.Item>
        </div>
      </Form>

      <Table columns={columns} dataSource={tableData} />
    </>
  );
}

export default Additem_page;
