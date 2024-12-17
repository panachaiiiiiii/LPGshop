import { notification } from "antd";
import axios from "axios";
import { APIPaths } from "../configs/path";
import { data_User_Manager, Token, Userdetail } from "../interface/sellproduct";
import { data_Profile } from "../interface/user";
import { ClearTokenAll, getToken } from "../util/utils";

export const UpdateUserEnabled = async (numkey: number, values: boolean) => {
  try {
    const response = await axios.put(
      APIPaths.UpdateEnabled + numkey,
      { enabled: values },
      {
        headers: {
          Authorization: `Bearer ${getToken("Token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const CheckME = async (): Promise<Token> => {
  try {
    const res = await axios.get(APIPaths.AuthMe, {
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${getToken("Token")}`,
      },
    });
    if (res.status === 401) {
      throw false;
    }
    return res.data as Token;
  } catch (err) {
    ClearTokenAll();
    throw false;
  }
};
export const Getprofile = async (): Promise<data_Profile> => {
  try {
    const response = await axios.get(APIPaths.GetProfile, {
      timeout: 5000,
      headers: {
        Authorization: `Bearer ${getToken("Token")}`,
      },
    });
    if (response.status === 401) {
      throw false;
    }
    return response.data as data_Profile;
  } catch (err) {
    throw false;
  }
};
export const Updateprofile = async (nickname: string) => {
  try {
    const response = await axios.put(
      APIPaths.GetProfile,
      { nickName: nickname },
      {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${getToken("Token")}`,
        },
      }
    );
    return response;
  } catch (err) {
    throw false;
  }
};
export const Updatepassword = async (OPassword: string, NPassword: string) => {
  try {
    const response = await axios.put(
      APIPaths.Password,
      { oldPassword: OPassword, newPassword: NPassword },
      {
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${getToken("Token")}`,
        },
      }
    );

    return response;
  } catch (err:any) {
    return err.response;
  }
};
export const DEL_User = async (record: data_User_Manager) => {
  console.log(record);
  const nick = await record.nickName;
  axios
    .delete(APIPaths.DELETEUser + record.id, {
      headers: {
        Authorization: `Bearer ${getToken("Token")}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notification.warning({
          message: "ลบสำเร็จ",
          description: "ระบบได้ลบ " + nick,
        });
      }
      return 1;
    })
    .catch((err) => {
      console.log(err);
      notification.error({
        message: "ลบไม่สำเร็จ (" + err.status + ")",
        description: err.statusText,
      });
      return 0;
    });
};

export const Edit_User = async (record: data_User_Manager, numkey: number) => {
  try {
    const response = await axios.put(APIPaths.EditUserAdmin + numkey, record, {
      headers: {
        Authorization: `Bearer ${getToken("Token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log("ERROR", error);
    return error;
  }
};

export const AddUserAdmin = async (data: Userdetail) => {
  try {
    const response = await axios.post(APIPaths.AddUserAdmin, data, {
      headers: {
        Authorization: `Bearer ${getToken("Token")}`,
      },
    });

    return response;
  } catch (error) {
    console.log("ERROR");
    return error;
  }
};
