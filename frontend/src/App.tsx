import {
  AppstoreOutlined,
  MailOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddItemPage from "./page/Additem_page";
import HomePage from "./page/home";
import SettingPage from "./page/setting_page";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <a href="/">ขายสินค้า</a>,
    key: "sell",
    icon: <MailOutlined />,
  },
  {
    label: <a href="/add-item">จัดการสินค้า</a>,
    key: "add",
    icon: <AppstoreOutlined />,
  },
  {
    label: <a href="/s">คลังสินค้า</a>,
    key: "app",
    icon: <AppstoreOutlined />,
  },
  
];
function App() {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <BrowserRouter>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        className="mb-10"
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="setting" element={<SettingPage />} />
        <Route path="add-item" element={<AddItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
