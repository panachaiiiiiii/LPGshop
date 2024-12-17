import { Button } from "antd";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Paths } from "../../configs/path";
import { AiOutlineMenu } from "react-icons/ai";
const StaffLayout = () => {
  const [PhoneMenu, SetPhoneMenu] = useState<boolean>(false);
  return (
    <>
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


          <span className="ml-auto"></span>
          <div className=" hover:text-Or">
            <a href={Paths.LOGOUT}>logout</a>
          </div>
          <div className=" hover:text-Or self-center">
            <a href={Paths.HOME}>
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
              ><AiOutlineMenu/></Button>
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
              <a href={Paths.LOGOUT}>logout</a>
            </div>
            <div className="p-2">
              <a href={Paths.HOME}>Profile</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StaffLayout