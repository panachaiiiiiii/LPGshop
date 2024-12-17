import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Paths } from "../configs/path";
import { Token } from "../interface/sellproduct";
import RoleBasedLayout from "../layout/RoleBasedLayout";
import AddItemPage from "../page/AddProduct/Additem_page";
import HomePage from "../page/home";
import Login_page from "../page/Login/Login";
import Logout from "../page/Logout/Logout";
import Sellproduct from "../page/Sell_Product/sellproduct";
import StaffManager from "../page/StaffManager/StaffManager";
import { CheckME } from "./User";

export default function AppRouters() {
  const [role, setRole] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRole = async () => {
    try {
      const data: Token = await CheckME();
      if (!data) {
        console.log("not data");
      }
      await setRole(data.role);
      setLoading(false);
    } catch (err) {
      setRole(null);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRole();
  }, []);

  if (loading) {
    return <></>;
  }
  const Routers = createBrowserRouter([
    {
      path: Paths.HOME,
      element: <RoleBasedLayout role={role} />, // ส่ง role ผ่าน props
      children: [
        { path: Paths.ADDPRODUCT, element: <AddItemPage /> },
        { path: Paths.SELL, element: <Sellproduct /> },
        { path: Paths.HOME, element: <HomePage /> },
        { path: Paths.UserManager, element: <StaffManager /> },
      ],
    },
    { path: Paths.LOGINPAGE, element: <Login_page /> },
    { path: Paths.LOGOUT, element: <Logout /> },
  ]);

  return <RouterProvider router={Routers} />;
}
