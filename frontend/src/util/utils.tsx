import { Token } from "../interface/sellproduct";
import axios from "axios";
import { APIPaths } from "../configs/path";

export const saveToken = (name: string, token: string) => {
  sessionStorage.setItem(name, token);
};

export const getToken = (name: string) => {
  return sessionStorage.getItem(name);
};

export const ClearTokenAll = () => {
  sessionStorage.clear();
};
export const ClearSomeToken = (name: string) => {
  sessionStorage.removeItem(name);
};

export const convertToThaiTime = (utcTime: string): string => {
  const date = new Date(utcTime);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    // hour: '2-digit',
    // minute: '2-digit',
    // second: '2-digit',
  };
  return date.toLocaleString("th-TH", options);
};
