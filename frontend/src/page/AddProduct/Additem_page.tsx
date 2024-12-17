import type { FormProps, TableProps } from "antd";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Popconfirm,
  Space,
  Switch,
  Table,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIPaths, Paths } from "../../configs/path";
import { data_Admin, Token } from "../../interface/sellproduct";
import { getToken } from "../../util/utils";
import { CheckME } from "../../router/User";
import {
  DEL_Product,
  EditProduct,
  GetProductAdmin,
} from "../../router/Product";
function Additem_page() {
  const [data, setdata] = useState<data_Admin[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm] = useForm();
  const [forms] = useForm();
  const [active, setActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [numkey, setNumKey] = useState<number | undefined>();
  const navigate = useNavigate();
  //check role admin
  const fetchDatas = async () => {
    const result: data_Admin[] = await GetProductAdmin();
    setdata(result);
  };
  const fetchRole = async () => {
    const role: Token = await CheckME();
    if (role.role === 2) {
      fetchDatas();
      setLoading(false);
    } else {
      navigate(Paths.HOME);
    }
  };
  useEffect(() => {
    fetchRole();
  }, []);

  if (loading) {
    return <></>;
  }

  const confirm = async (record: data_Admin) => {
    await DEL_Product(record);
    fetchDatas();
  };

  const columns: TableProps<data_Admin>["columns"] = [
    { title: "รหัสสินค้า", dataIndex: "barcode", key: "barcode" },
    { title: "ชื่อ", dataIndex: "name", key: "name" },
    { title: "ต้นทุน", dataIndex: "cost", key: "cost" },
    { title: "ราคาขาย", dataIndex: "price", key: "price" },
    { title: "จำนวน", dataIndex: "quantity", key: "quantity" },
    {
      title: "รายละเอียด",
      key: "info",
      render: (_, record: data_Admin) => (
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
          <Button onClick={() => showModal(record)}>Edit</Button>
        </Space>
      ),
    },
  ];

  const onFinish: FormProps["onFinish"] = (values) => {
    axios
      .post(APIPaths.CreatedItems, values, {
        headers: {
          Authorization: `Bearer ${getToken("Token")}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          notification.success({
            message: "เพิ่มสินค้าสำเร็จ",
            description: "ระบบได้เพิ่ม " + values.name,
          });
        }
        fetchDatas();
      })
      .catch((err) => {
        if (err.status === 400) {
          notification.error({
            message: "เพิ่มสินค้าไม่สำเร็จ (" + err.status + ")",
            description: "มีชื่อสินค้านี้อยู่เเล้ว ",
          });
        }
        console.log("Error : ", err);
      });
    forms.resetFields();
  };

  const editFinish: FormProps["onFinish"] = async (values) => {
    if (numkey !== undefined) {
      const response = await EditProduct(numkey, values);
      if (response) {
        if (response.status === 200) {
          notification.success({
            message: "แก้ไขสำเร็จ",
            description: "ระบบได้แก้ไข " + values.name,
          });
        }
      }
      editForm.resetFields();
      setActive(false);
      setNumKey(undefined);
    }
  };

  const showModal = (record: data_Admin) => {
    setNumKey(record.id);
    editForm.setFieldsValue({
      name: record.name,
      price: record.price,
      cost: record.cost,
      quantity: record.quantity,
      enabled: record.enabled,
    });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    editForm.submit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Form
        onFinish={onFinish}
        clearOnDestroy={true}
        form={forms}
        className={!active ? "" : "hidden"}
      >
        <div className="md:flex md:justify-center md:space-x-4 md:mx-0 mx-4 mt-12">
          <Form.Item
            label="ชื่อสินค้า"
            name="name"
            rules={[{ required: true, message: "กรอกชื่อสินค้า" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ต้นทุน"
            name="cost"
            rules={[{ required: true, message: "กรอกต้นทุนสินค้า" }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item
            label="ราคาขาย"
            name="price"
            rules={[{ required: true, message: "กรอกราคาขายสินค้า" }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item
            label="จำนวน"
            name="quantity"
            rules={[{ required: true, message: "กรอกจำนวนสินค้า" }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item className="justify-end">
            <Button type="primary" htmlType="submit">
              เพิ่มสินค้า
            </Button>
          </Form.Item>
        </div>
      </Form>

      <div className="md:mx-auto container overflow-x-auto">
        <Table columns={columns} dataSource={data} />
      </div>
      <Modal
        title="แก้ไขสินค้า"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={editFinish} form={editForm}>
          <div className="grid grid-cols-2 space-x-3">
            <div className="col-span-2">
              <Form.Item
                label="ชื่อสินค้า"
                name="name"
                rules={[{ required: true, message: "กรอกชื่อสินค้า" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="ต้นทุน"
                name="cost"
                rules={[{ required: true, message: "กรอกต้นทุน" }]}
              >
                <InputNumber min={0} className="w-full" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="ราคาขาย"
                name="price"
                rules={[{ required: true, message: "กรอกราคาขาย" }]}
              >
                <InputNumber min={0} className="w-full" />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="จำนวน"
                name="quantity"
                rules={[{ required: true, message: "กรอกจำนวนสินค้า" }]}
              >
                <InputNumber min={0} className="w-full" />
              </Form.Item>
            </div>
            <div>
              <Form.Item label="เปิด-ปิด การใช้งาน" name="enabled">
                <Switch />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default Additem_page;
