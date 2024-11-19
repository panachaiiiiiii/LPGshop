import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { ConfigProvider, Menu } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddItemPage from "./page/Additem_page";
import HomePage from "./page/home";
import { Theme } from "./configs/theme";
import LayoutSelector from "./layout/layout";

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
  return (
    <ConfigProvider theme={Theme}>
      <BrowserRouter>
        {/* <Menu

        mode="horizontal"
        items={items}
        className="mb-10"
      /> */}
        <Routes>
          <Route
            path="/"
            element={
              <LayoutSelector>
                <HomePage />
              </LayoutSelector>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="add-item"
            element={
              <LayoutSelector>
                <AddItemPage />
              </LayoutSelector>
            }
          />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
