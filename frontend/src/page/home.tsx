import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../configs/path";
import { Token } from "../interface/sellproduct";
import { CheckME } from "../router/User"; 
function HomePage() {
  const navigate = useNavigate()
  const [Role,setRole] = useState<number|null>()
  const authMe = async ()=>{
    const data: Token = await CheckME();
    await setRole(data.role)
  }
  useEffect(()=>{
    authMe();
  });
  if(Role===2){
    return (
      <>
        <div className="grid grid-cols-1 h-screen content-center gap-24">
          <div className="mx-auto">
            <a href={Paths.SELL}>
              <Button size="large" className="w-28" type="primary">
                ขายสินค้า
              </Button>
            </a>
          </div>
          <div className="mx-auto">
            <a href="">
              <Button size="large" className="w-28" type="primary">
                รับสินค้า
              </Button>
            </a>
          </div>
          <div className="mx-auto">
            <a href={Paths.ADDPRODUCT}>
              <Button size="large" className="w-28" type="primary">
                จัดการสินค้า
              </Button>
            </a>
          </div>
        </div>
      </>);
  }else if (Role===1){
      return <>staff menu</>
  }
  else{
    navigate(Paths.LOGINPAGE)
  }
 
  
}

export default HomePage;
