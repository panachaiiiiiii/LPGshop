import axios from "axios";
import { APIPaths } from "../configs/path";
import { getToken } from "../util/utils";

export const Getdataorder = async (gte: Date, le: Date) => {
  try {
    const response = await axios.post(APIPaths.PostseeOrder, {gte:gte,le:le}, {
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
export const GetDetailOrder = async (Orderid: number) => {
    try {
      const response = await axios.post(APIPaths.PostDetailOrder, {Orderid:Orderid}, {
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
