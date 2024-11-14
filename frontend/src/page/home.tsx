import type { FormProps, TableProps } from "antd";
import { Button, Form, InputNumber, Select, Space, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useState, useEffect } from "react";

import Swal from "sweetalert2";

interface Tp {
  id: number;
  barcode: string;
  name: string;
  price: number;
  quantity: number;
  disabled: boolean;
}
interface Tb {
  key: number;
  id: number;
  name: string;
  price: number;
  count: number;
}

function HomePage() {
  const [formss] = useForm();
  const [tableData, setTableData] = useState<Tb[]>([]);
  const [maxnum, setmaxnum] = useState<number>(0);
  const [data, setdata] = useState<Tp[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/showitem")
      .then((res) => {
        setdata(
          res.data.map((result: Tp) => ({
            value: result.id,
            label: result.name,
            id: result.id,
            barcode: result.barcode,
            name: result.name,
            price: result.price,
            quantity: result.quantity,
            disabled: false,
          }))
        );
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  }, []);
  const onFinish: FormProps["onFinish"] = (values) => {
    console.log(values);
    const itemfinded = data.filter((iitem) => iitem.id === values.id);
    setTableData([
      ...tableData,
      {
        id: itemfinded[0].id,
        name: itemfinded[0].name,
        price: itemfinded[0].price,
        count: values.number,
        key:
          tableData.length === 0 ? 0 : tableData[tableData.length - 1].key + 1,
      },
    ]);
    const updatedata: Tp[] = data
      .map((i) => {
        if (i.id === values.id) {
          return { ...i, quantity: i.quantity - values.number }; // ลด quantity
        }
        return i;
      })
      .map((i) => {
        // ตั้งค่า disabled ถ้า quantity น้อยกว่า 1
        return i.quantity < 1 ? { ...i, disabled: true } : i;
      });
    setdata(updatedata);

    formss.resetFields();
  };
  const columns: TableProps["columns"] = [
    { title: "name", dataIndex: "name", key: "name" },
    { title: "price", dataIndex: "price", key: "price" },
    { title: "quantity", dataIndex: "count", key: "count" },
    {
      title: "รายละเอียด",
      key: "info",
      render: (_, record) => (
        <Space size="middle">
          <Button
            danger
            onClick={() => {
              console.log(record.id);
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then((result) => {
                const passdata = data
                  .map((i) => {
                    if (i.id === record.id) {
                      return { ...i, quantity: i.quantity + record.count }; // ลด quantity
                    }
                    return i;
                  })
                  .map((i) => {
                    // ตั้งค่า disabled ถ้า quantity น้อยกว่า 1
                    return i.quantity > 0 ? { ...i, disabled: false } : i;
                  });
                  setdata(passdata)
                if (result.isConfirmed) {
                  const new_data = tableData.filter(
                    (data) => data.key !== record.key
                  );
                  console.log(new_data);
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
            name="id"
            rules={[{ required: true, message: "กรอกชื่อสินค้า" }]}
          >
            <Select
              style={{ width: 200 }}
              allowClear
              options={data}
              placeholder="select it"
              onChange={(value) => {
                setmaxnum(data.filter((i) => i.id === value)[0].quantity);
                console.log(maxnum);
              }}
            />
          </Form.Item>
          <Form.Item
            label="จำนวน"
            name="number"
            style={{ width: 200 }}
            rules={[
              { required: true, message: "กรอกจำนวนสินค้า" },
              {
                validator: (_, value) =>
                  value && value <= maxnum
                    ? Promise.resolve()
                    : Promise.reject(new Error(`ค่าต้องไม่เกิน ${maxnum}`)),
              },
            ]}
          >
            <InputNumber min={1} className="w-full" />
          </Form.Item>
          <Form.Item className="justify-end">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
      <div className="px-3 sm:px-6 md:mx-auto container">
        <Table columns={columns} dataSource={tableData} rowKey="key" />
      </div>
      <div className="px-3 sm:px-6 md:mx-auto container my-4 justify-end flex space-x-6">
        <p>
          รวมทั้งหมด{" "}
          {tableData.reduce((totals, acc) => totals + acc.price * acc.count, 0)}
        </p>
        <Button disabled={tableData.length < 1} type="primary">
          ยืนยันการซื้อสินค้า
        </Button>
      </div>
    </>
  );
}

export default HomePage;
