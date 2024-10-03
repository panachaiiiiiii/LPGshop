import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import setting_page from "./components/Page/setting_page.tsx";
import Additem_page from "./components/Page/Additem_page.tsx";
import { Header } from "antd/es/layout/layout";
import { Menu } from "antd";
import { ConfigProvider } from "antd";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: App(),
  },
  { path: "/setting", element: setting_page() },
  { path: "/additem", element: Additem_page() },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
