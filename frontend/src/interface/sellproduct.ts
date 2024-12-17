export interface data_sell {
    id: number;
    barcode: string;
    name: string;
    price: number;
    quantity: number;
    disabled: boolean;
  }
  export interface data_Admin {
    id: number;
    barcode: string;
    name: string;
    cost: number;
    price: number;
    quantity: number;
    enabled: boolean;
  }
  export interface data_User_Manager {
    id: number;
    username: string;
    nickName: string;
    nickname: string;
    role: string;
    createdAt: string;
    enabled: boolean;
    password: string;
  }
  export interface ProductOrder {
    id: number;
    count:number;
  }
export interface Userdetail{
  username: string;
  nickname: string;
  roles: number;
  password: string;
}
  export interface Table_sell {
    key: number;
    id: number;
    name: string;
    price: number;
    count: number;
    sum: number;
  }
  export type Token = {
    id: number|null;
    nickname: string|null;
    role: number|null;
  }
  