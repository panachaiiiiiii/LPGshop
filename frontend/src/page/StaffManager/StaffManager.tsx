import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  TableProps
} from "antd";
import { FormProps, useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../configs/path";
import {
  data_User_Manager,
  Token
} from "../../interface/sellproduct";
import { GetProdectUserALL } from "../../router/Product";
import {
  AddUserAdmin,
  CheckME,
  DEL_User,
  Edit_User,
  UpdateUserEnabled,
} from "../../router/User";
import { convertToThaiTime } from "../../util/utils";

const StaffManager = () => {
  const [data, setdata] = useState<data_User_Manager[]>();
  const [NumKey, setNumKey] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenAddUser, setIsModalOpenAddUser] = useState(false);
  const [editForm] = useForm();
  const [AddUser] = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  const re = (data: string) => {
    if (data == "1") {
      return "Staff";
    }
    if (data == "2") {
      return "Admin";
    } else {
      return "อื่น ๆ";
    }
  };
  const fetchData = async () => {
    const result: data_User_Manager[] = await GetProdectUserALL();
    setdata(
      result.map((newdata: data_User_Manager) => ({
        ...newdata,
        role: re(newdata.role),
        createdAt: convertToThaiTime(newdata.createdAt),
      }))
    );
  };
  const fetchRole = async () => {
    const role: Token = await CheckME();
    if (role.role === 2) {
      fetchData();
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

  const DELuser = async (record: data_User_Manager) => {
    await DEL_User(record);
    fetchData();
  };
  const columns: TableProps<data_User_Manager>["columns"] = [
    { title: "ID ผู้ใช้", dataIndex: "id", key: "id" },
    { title: "username", dataIndex: "username", key: "username" },
    { title: "ชื่อผู้ใช้", dataIndex: "nickName", key: "nickName" },
    { title: "ตำเเหน่ง", dataIndex: "role", key: "role" },
    { title: "สร้างเมื่อ", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "การใช้งาน",
      key: "enabled",
      render: (_, record: data_User_Manager) => (
        <Space size="small">
          <Switch
            defaultChecked={record.enabled}
            checked={record.enabled}
            onChange={async (Check) => {
              const response: any = await UpdateUserEnabled(record.id, Check);
              if (response.status === 200) {
                notification.success({
                  message: "แก้ไขสำเร็จ",
                });
              } else {
                notification.error({
                  message: "เกิดข้อผิดพลาด (" + response.response.status + ")",
                  description: response.response.data,
                });
              }
              fetchData();
            }}
          />
        </Space>
      ),
    },
    {
      title: "รายละเอียด",
      key: "info",
      render: (_, record: data_User_Manager) => (
        <Space size="middle">
          <Popconfirm
            title="ลบรายชื่อ"
            description="คุณเเน่ใช้ไหมว่าต้องการลบรายชื่อ?"
            onConfirm={() => {
              DELuser(record);
            }}
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
  const showModal = (record: data_User_Manager) => {
    setNumKey(record.id);
    editForm.setFieldsValue({
      nickname: record.nickName,
      role: record.role === "Staff" ? 1 : 2,
      username: record.username,
    });
    setIsModalOpen(true);
  };
  const handleOk = () => {
    editForm.submit();
    setIsModalOpen(false);
  };
  const handleOkAdd = () => {
    AddUser.submit();
    setIsModalOpenAddUser(false);
  };
  const AddUserFinish: FormProps["onFinish"] = async (values) => {
    const responses: any = await AddUserAdmin(values);
    if (responses.status === 201) {
      notification.success({
        message: "เพิ่มพนักงานสำเร็จ",
        description: "ระบบได้เพิ่มพนักงาน " + values.nickname,
      });
    }
    if (responses.status === 401) {
      notification.error({
        message: "เกิดข้อผิดพลาด (" + responses.status + ")",
        description: "username ซ้ำ",
      });
    }
    AddUser.resetFields();
    fetchData();
  };
  const cancleEdit = async () => {
    await editForm.resetFields();
    fetchData();
    setIsModalOpen(false);
  };
  const cancleAdd = async () => {
    await AddUser.resetFields();
    fetchData();
    setIsModalOpenAddUser(false);
  };
  const editFinish: FormProps["onFinish"] = async (values) => {
    const responses: any = await Edit_User(values, NumKey);
    if (responses.status === 200) {
      notification.success({
        message: "แก้ไขสำเร็จ",
        description: "ระบบได้แก้ไข " + values.nickname,
      });
    } else {
      notification.error({
        message: "เกิดข้อผิดพลาด (" + responses.response.status + ")",
        description: responses.response.data,
      });
    }
    fetchData();
  };
  return (
    <div className="mt-12 space-y-5">
      <div className="flex-row-reverse flex">
        <Button type="primary" onClick={() => setIsModalOpenAddUser(true)}>
          เพิ่มพนักงาน
        </Button>
      </div>
      <div className="overflow-x-auto ">
        <Table columns={columns} dataSource={data} />
      </div>
      <Modal
        title="เพิ่มพนักงาน"
        open={isModalOpenAddUser}
        onOk={handleOkAdd}
        onCancel={cancleAdd}
      >
        <Form onFinish={AddUserFinish} form={AddUser}>
          <div className="grid grid-cols-2 space-x-3">
            <div className="col-span-2">
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "กรอก Username" }]}
              >
                <Input />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                label="ชื่อ"
                name="nickname"
                rules={[{ required: true, message: "กรอกชื่อ" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="บทบาท"
                name="roles"
                rules={[{ required: true, message: "เลือกบทบาท" }]}
              >
                <Select
                  style={{ width: 120 }}
                  options={[
                    { value: 1, label: "Staff" },
                    { value: 2, label: "Admin" },
                  ]}
                />
              </Form.Item>
            </div>
            <div className="col-span-2">
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "กรอก Password" }]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
      <Modal
        title="แก้ไขรายละเอียดพนักงาน"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={cancleEdit}
      >
        <Form onFinish={editFinish} form={editForm}>
          <div className="grid grid-cols-2 space-x-3">
            <div className="col-span-2">
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "กรอก Username" }]}
              >
                <Input />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                label="ชื่อ"
                name="nickname"
                rules={[{ required: true, message: "กรอกชื่อ" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="บทบาท"
                name="role"
                rules={[{ required: true, message: "เลือกบทบาท" }]}
              >
                <Select
                  style={{ width: 120 }}
                  options={[
                    { value: 1, label: "Staff" },
                    { value: 2, label: "Admin" },
                  ]}
                />
              </Form.Item>
            </div>
            <div className="col-span-2">
              <Form.Item label="Password" name="password">
                <Input />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default StaffManager;
