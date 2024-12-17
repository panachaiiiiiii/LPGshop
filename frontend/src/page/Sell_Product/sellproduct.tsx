import type { FormProps, TableProps } from "antd";
import {
  Button,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  notification,
  Popconfirm,
  Radio,
  Space,
  Table,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { data_sell, Table_sell } from "../../interface/sellproduct";
import { GetProdectALL, PostOrder } from "../../router/SellProduct";
import type { RadioChangeEvent } from "antd";
function Sellproduct() {
  const [formss] = useForm();
  const [tableData, setTableData] = useState<Table_sell[]>([]);
  const [data, setdata] = useState<data_sell[]>([]);
  const [value, setValue] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const featchdata = async () => {
    const response = await GetProdectALL();
    setdata(response);
  };
  useEffect(() => {
    featchdata();
  }, []);
  const onChange = (e: RadioChangeEvent) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  const onFinish: FormProps["onFinish"] = (values) => {
    const itemfinded = data.filter((iitem) => iitem.barcode === values.barcode);

    if (itemfinded.length === 0) {
      notification.error({
        message: "ข้อผิดพลาด",
        description: "ไม่พบ bar code นี้",
      });
      formss.resetFields();
      return;
    }

    const existingIndex = tableData.findIndex(
      (item) => item.name === itemfinded[0].name
    );

    if (existingIndex >= 0) {
      const updatedTableData = [...tableData];
      updatedTableData[existingIndex].count += values.quantity;
      updatedTableData[existingIndex].sum +=
        values.quantity * updatedTableData[existingIndex].price;

      setTableData(updatedTableData);
      notification.success({
        message: "สำเร็จ",
        description: "อัปเดตรายการสำเร็จ",
      });
    } else {
      setTableData([
        ...tableData,
        {
          id: itemfinded[0].id,
          name: itemfinded[0].name,
          price: itemfinded[0].price,
          count: values.quantity,
          key:
            tableData.length === 0
              ? 0
              : tableData[tableData.length - 1].key + 1,
          sum: itemfinded[0].price * values.quantity,
        },
      ]);
      notification.success({
        message: "สำเร็จ",
        description: "เพิ่มรายการสำเร็จ",
      });
    }

    formss.resetFields();
  };
  const confirm = (record: Table_sell) => {
    const new_data = tableData.filter((data) => data.key !== record.key);
    console.log(new_data);
    setTableData(new_data);
    notification.warning({
      message: "ลบสำเร็จ",
      description: "ระบบได้ลบ " + record.name,
    });
  };
  const columns: TableProps<Table_sell>["columns"] = [
    { title: "name", dataIndex: "name", key: "name" },
    { title: "price", dataIndex: "price", key: "price" },
    { title: "quantity", dataIndex: "count", key: "count" },
    { title: "sum", dataIndex: "sum", key: "sum" },
    {
      title: "รายละเอียด",
      key: "info",
      render: (_, record: Table_sell) => (
        <Space size="middle">
          <Popconfirm
            title="ลบสินค้า"
            description="คุณเเน่ใช้ไหมว่าต้องการลบสินค้าชิ้นนี้?"
            onConfirm={() => confirm(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const response: any = await PostOrder(value, tableData);
    if (response.status === 200) {
      setTableData([]);
      notification.success({
        message: "สำเร็จ",
      });
    }
    if (response.status != 200) {
      notification.error({
        message: "เกิดข้อผิดพลาด",
      });
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Form onFinish={onFinish} form={formss}>
        <div className="md:flex md:justify-center md:space-x-4 md:mx-0 mx-4">
          <Form.Item
            label="Barcode"
            name="barcode"
            rules={[{ required: true, message: "กรุณากรอก Bar code" }]}
          >
            <Input />
          </Form.Item>{" "}
          <Form.Item
            label="จำนวน"
            name="quantity"
            style={{ width: 200 }}
            rules={[{ required: true, message: "กรอกจำนวนสินค้า" }]}
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
      <div className="md:mx-auto container overflow-x-auto">
        <Table columns={columns} dataSource={tableData} rowKey="key" />
      </div>
      <div className="px-3 sm:px-6 md:mx-auto container my-4 justify-end flex space-x-6">
        <p>
          รวมทั้งหมด
          {tableData.reduce((totals, acc) => totals + acc.price * acc.count, 0)}
        </p>
        <Button
          disabled={tableData.length < 1}
          type="primary"
          onClick={showModal}
        >
          ยืนยันการซื้อสินค้า
        </Button>
      </div>
      <Modal
        title={
          "รวมราคา " +
          tableData.reduce((totals, acc) => totals + acc.price * acc.count, 0)
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <List
          dataSource={tableData}
          renderItem={(tableData) => (
            <List.Item key={1}>
              <List.Item.Meta
                title={<p>ชื่อสินค้า</p>}
                description={<p>{tableData.name}</p>}
              />

              <List.Item.Meta
                title={<p>จำนวนสินค้า</p>}
                description={<p>{tableData.count}</p>}
              />
              <div>{tableData.sum}</div>
            </List.Item>
          )}
        />
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>เงินสด</Radio>
          <Radio value={2}>scan</Radio>
        </Radio.Group>
      </Modal>
    </>
  );
}

export default Sellproduct;
