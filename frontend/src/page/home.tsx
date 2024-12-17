import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../configs/path";
import { Token } from "../interface/sellproduct";
import AddminHome from "../components/Home/AddminHome";
import { CheckME } from "../router/User";

function HomePage() {
  const navigate = useNavigate();
  const [Role, setRole] = useState<number | null>();
  const authMe = async () => {
    const data: Token = await CheckME();
    await setRole(data.role);
  };
  useEffect(() => {
    authMe();
  });
  if (Role === 2) {
    return (
      <>
        <AddminHome />
      </>
    );
  } else if (Role === 1) {
    return <>staff menu</>;
  } else {
    navigate(Paths.LOGINPAGE);
  }
}

export default HomePage;
