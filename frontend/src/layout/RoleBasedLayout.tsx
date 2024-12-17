import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Paths } from "../configs/path";
import AdminLayout from "./role/adminLayout";
import StaffLayout from "./role/staffLayout";

interface RoleBasedLayoutProps {
  role: number | null | undefined; // ระบุประเภทของ role
}
const RoleBasedLayout: React.FC<RoleBasedLayoutProps> = ({ role }) => {
  if (role === 2) {
    return (
      <div className="space-y-8">
        <AdminLayout />
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    );
  } else if (role === 1) {
    return (
      <div className="space-y-4">
        <StaffLayout />
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    );
  } else if (role == null) {
    return <Navigate to={Paths.LOGINPAGE} />;
  } else {
    return <div></div>;
  }
};

export default RoleBasedLayout;
