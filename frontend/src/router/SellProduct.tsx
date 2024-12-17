import { notification } from "antd";
import axios from "axios";
import { APIPaths } from "../configs/path";
import { data_Admin, ProductOrder } from "../interface/sellproduct";
import { getToken } from "../util/utils";

export const GetProdectALL = async () => {
  try {
    const response = await axios.get(APIPaths.GetAllItems, {
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

export const PostOrder = async (payby:number,Products:ProductOrder[]) => {
  try {
    const response = await axios.post(APIPaths.PostOrder,{payby:payby,Products:Products}, {
      headers: {
        Authorization: `Bearer ${getToken("Token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log("ERROR", error);
    return false;
  }
};
