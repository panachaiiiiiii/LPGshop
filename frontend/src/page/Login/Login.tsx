import { Button, Form, FormProps, Input, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIPaths, Paths } from "../../configs/path";
import { getToken, saveToken } from "../../util/utils";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState(true);
  const navigate = useNavigate();
  const [form] = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  useEffect(() => {
    const token = getToken("Token");
    if (token) {
      navigate(Paths.HOME);
    } else {
      setLoadings(false);
    }
  }, []);
  // ฟังก์ชันเมื่อ login สำเร็จ
  const onFinish: FormProps["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(APIPaths.PostLogin, values);
      await saveToken("Token", res.data.token); // บันทึก token ลงใน localStorage หรือที่จัดเก็บ
      notification.success({
        message: "เข้าสู่ระบบสำเร็จ",
      });

      window.location.reload();
    } catch (err) {
      notification.error({
        message: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเข้าสู่ระบบได้",
      });
    } finally {
      setLoading(false); // ปิดสถานะ loading
    }
  };
  if (!loadings) {
    return (
      <div className="place-content-center h-screen">
        <div className="rounded-lg bg-Egg_color border-Green_w border-2 w-4/5 lg:w-4/12 container mx-auto p-4 grid grid-cols-1 sm:gap-2 sm:h-[300px]">
          <p className="text-center text-3xl my-3">Login</p>
          <Form onFinish={onFinish} form={form}>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "กรุณากรอก User name" }]}
            >
              <Input size="large" placeholder="input username" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "กรุณากรอก password" }]}
            >
              <Input.Password
                size="large"
                placeholder="input password"
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
              />
            </Form.Item>
            <Form.Item className="justify-end container">
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="container"
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
};

export default LoginPage;
