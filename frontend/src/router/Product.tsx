import { notification } from "antd";
import axios from "axios";
import { APIPaths } from "../configs/path";
import { data_Admin } from "../interface/sellproduct";
import { getToken } from "../util/utils";

export const EditProduct = async (userid: number, values: data_Admin) => {
  try {
    const response = await axios.put(APIPaths.UpdateItems + userid, values, {
      headers: {
        Authorization: `Bearer ${getToken("Token")}`,
      },
    });
    return response;
  } catch (err) {
    console.log("ERR:", err);
    return false;
  }
};
export const DEL_Product = async (record: data_Admin) => {
  axios
    .delete(APIPaths.DELETEItems + record.id, {
      headers: {
        Authorization: `Bearer ${getToken("Token")}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        notification.warning({
          message: "ลบสำเร็จ",
          description: "ระบบได้ลบ " + record.name,
        });
      }
      return 1;
    })
    .catch((err) => {
      notification.error({
        message: "ลบไม่สำเร็จ (" + err.status + ")",
        description: err.statusText,
      });
      return 0;
    });
};

export const GetProductAdmin = async () => {
  try {
    const response = await axios.get(APIPaths.GetAllItemsAdmin, {
      headers: {
        Authorization: `Bearer ${getToken("Token")}`,
      },
    });
    if (response.status !== 200) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.log("ERROR", error);
    return false;
  }
};

export const GetProdectUserALL = async () => {
  try {
    const response = await axios.get(APIPaths.GetAllUser, {
      headers: {
        Authorization: `Bearer ${getToken("Token")}`,
      },
    });
    if (response.status !== 200) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.log("ERROR", error);
    return false;
  }
};
