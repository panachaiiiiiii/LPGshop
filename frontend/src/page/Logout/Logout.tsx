import { notification } from "antd";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../configs/path";
import { ClearTokenAll } from "../../util/utils";
const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    ClearTokenAll();
    navigate(Paths.LOGINPAGE);
    notification.success({
      message: "ออกระบบสำเร็จ",
    });
  }, []);
  return <div>Logout</div>;
};

export default Logout;
