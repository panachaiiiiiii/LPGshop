import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";

interface LayoutSelectorProps {
  children: React.ReactNode;
}
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
const LayoutSelector: React.FC<LayoutSelectorProps> = ({ children }) => {
  const location = useLocation();
  if ((location.pathname = "/")) {
    return <>{children}</>;
  } else {
    <Menu mode="horizontal" items={items} className="mb-10" />;
    {
      children;
    }
  }
};

export default LayoutSelector;
