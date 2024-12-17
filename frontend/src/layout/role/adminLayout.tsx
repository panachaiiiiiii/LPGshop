import { Button, Form, Input, Modal, notification } from "antd";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Paths } from "../../configs/path";
import { AiOutlineMenu } from "react-icons/ai";
import { Getprofile, Updatepassword, Updateprofile } from "../../router/User";
import { FormProps, useForm } from "antd/es/form/Form";

const AdminLayout = () => {
  const [PhoneMenu, SetPhoneMenu] = useState<boolean>(false);
  const [isModalOpen, SetisModalOpen] = useState<boolean>(false);
  const [editprofileForm] = useForm();
  const [editPasswrodForm] = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [isPasswordModalOpen, SetisPasswordModalOpen] =
    useState<boolean>(false);
  const [isEdit, SetisEdit] = useState<boolean>(true);

  const getdata_profile = async () => {
    const response = await Getprofile();
    console.log(response);
    await editprofileForm.setFieldsValue({
      nickname: response.nickName,
      role: response.role === "Staff" ? 1 : 2,
      username: response.username,
    });
    SetisModalOpen(!isModalOpen);
  };

  const saveEditProfile = () => {
    if (isEdit) {
      notification.error({
        message: "แก้ไขไม่สำเร็จ",
        description: "Editไม่ได้เปิด",
      });
      return false;
    }
    editprofileForm.submit();
  };
  const EditFinish: FormProps["onFinish"] = async (values) => {
    const responses: any = await Updateprofile(values.nickname);
    if (responses.status === 200) {
      notification.success({
        message: "แก้ไขสำเร็จ",
      });
      SetisEdit(true);
      SetisModalOpen(false);
    } else {
      notification.error({
        message: "เกิดข้อผิดพลาด (" + responses.status + ")",
        description: "username ซ้ำ",
      });
    }
  };
  const onEditFailed: FormProps["onFinish"] = async () => {
    notification.error({
      message: "เกิดข้อผิดพลาด",
      description: "nickname ไม่ได้กรอก",
    });
  };

  const SavePassword = async () => {
    editPasswrodForm.submit();
  };
  const PasswordEdit: FormProps["onFinish"] = async (values) => {
    const responses:any = await Updatepassword(
      values.oldpassword,
      values.newpassword
    );
    console.log(responses);
    if (responses.status === 200) {
      notification.success({
        message: "แก้ไขสำเร็จ",
      });
    }
    if (responses.status === 400) {
      notification.error({
        message: "Password ผิด",
      });
    }
    editPasswrodForm.resetFields();
    setPasswordVisible(false);
    setPasswordVisible2(false);
    SetisPasswordModalOpen(false);
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        footer={null}
        onCancel={() => SetisModalOpen(false)}
      >
        <div className="container pt-7 ">
          <div className="flex justify-between mb-3">
            <p className="text-2xl font-semibold">Profile</p>
            <Button onClick={() => SetisEdit(!isEdit)}>Edit</Button>
          </div>
          <Form
            form={editprofileForm}
            onFinish={EditFinish}
            onFinishFailed={onEditFailed}
          >
            <div className="grid grid-cols-2 gap-x-2">
              <Form.Item
                className="col-span-2"
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="name"
                name="nickname"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input disabled={isEdit} />
              </Form.Item>
              <Form.Item label="Role" name="role">
                <Input disabled />
              </Form.Item>
            </div>
          </Form>
        </div>
        <div className="flex justify-between">
          <Button
            type="primary"
            onClick={() => {
              SetisPasswordModalOpen(!isPasswordModalOpen);
            }}
          >
            Edit Password
          </Button>
          <Button
            type="primary"
            onClick={() => {
              saveEditProfile();
            }}
          >
            Save
          </Button>
        </div>
      </Modal>

      <Modal
        open={isPasswordModalOpen}
        footer={null}
        onCancel={() =>     {editPasswrodForm.resetFields();
          setPasswordVisible(false);
          setPasswordVisible2(false);
          SetisPasswordModalOpen(false);}}
      >
        <p className="text-xl">Profile Password</p>

        <div className="container pt-2 ">
          <Form
            form={editPasswrodForm}
            onFinish={PasswordEdit}
          >
            <div className="grid grid-cols-1  gap-x-2">
              <Form.Item
                label="Old password"
                name="oldpassword"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input.Password
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                />
              </Form.Item>
              <Form.Item
                label="New password"
                name="newpassword"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input.Password
                  visibilityToggle={{
                    visible: passwordVisible2,
                    onVisibleChange: setPasswordVisible2,
                  }}
                />
              </Form.Item>
            </div>
          </Form>
        </div>
        <div className="justify-self-end">
          <Button type="primary" onClick={() => SavePassword()}>
            Edit Password
          </Button>
        </div>
      </Modal>

      <div className="flex space-x-2 min-h-12 items-center bg-Egg_color border-2 border-Green_w px-3 top-0 w-screen sticky  z-10">
        <div className="sm:flex gap-4 container mx-auto hidden">
          <div className="hover:text-Or">
            <a href={Paths.HOME}>หน้าหลัก</a>
          </div>
          <div className="hover:text-Or">
            <a href={Paths.SELL}>ขายสินค้า</a>
          </div>
          <div className="hover:text-Or">
            <a href={Paths.HOME}>รับสินค้า</a>
          </div>
          <div className="hover:text-Or">
            <a href={Paths.ADDPRODUCT}>จัดการสินค้า</a>
          </div>
          <div className="hover:text-Or">
            <a href={Paths.UserManager}>จัดการพนักงาน</a>
          </div>
          <span className="ml-auto"></span>
          <div className=" hover:text-Or">
            <a href={Paths.LOGOUT}>logout</a>
          </div>
          <div className=" hover:text-Or self-center">
            <a onClick={() => getdata_profile()}>
              <FaUser />
            </a>
          </div>
        </div>
        {/* smart Phone */}
        <div className="sm:hidden  gap-4 container mx-auto">
          <div className="flex ">
            <div>
              <a href={Paths.HOME}>หน้าหลัก</a>
            </div>
            <div className="ml-auto">
              <Button
                onClick={() => {
                  SetPhoneMenu(!PhoneMenu);
                }}
              >
                <AiOutlineMenu />
              </Button>
            </div>
          </div>
          <div
            className={
              PhoneMenu
                ? " fixed right-0 bg-Egg_color w-full max-w-60 rounded-md border-2 top-12"
                : "hidden "
            }
          >
            <div className="p-2">
              <a href={Paths.SELL}>ขายสินค้า</a>
            </div>
            <div className="p-2">
              <a href={Paths.HOME}>รับสินค้า</a>
            </div>
            <div className="p-2">
              <a href={Paths.ADDPRODUCT}>จัดการสินค้า</a>
            </div>
            <div className="p-2">
              <a href={Paths.UserManager}>จัดการพนักงาน</a>
            </div>
            <div className="p-2">
              <a onClick={() => getdata_profile()}>Profile</a>
            </div>
            <div className="p-2">
              <a href={Paths.LOGOUT}>logout</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
