export const Paths = {
    HOME: "/",
    SELL: "/SellProduct" ,
    ADDPRODUCT:"/AddProduct",
    LOGINPAGE:"/Login",
    LOGOUT:"/Logout",
    UserManager:"/UserManager",
    
  };
  const api= "http://localhost:5001/api";
  
  export const APIPaths={
    PostseeOrder: api+"/GetOrder",
    PostDetailOrder: api+"/GetDetailOrder",
    GetAllItems : api+"/showitem",
    GetAllItemsAdmin: api+"/showitem-admin",
    DELETEItems:api+"/remove/",
    DELETEUser:api+"/admin/user/",
    UpdateItems:api+"/update-product/",
    CreatedItems:api+"/createproduct",
    PostLogin: api+"/Login",
    GetAllUser:api+"/admin/user",
    UpdateEnabled: api+"/admin/user/enabled/",
    EditUserAdmin:api+"/admin/user/",
    AddUserAdmin:api+"/admin/user",
    GetProfile: api+"/profile",
    Password: api+"/profile/password",
    AuthMe: api+"/check",
    PostOrder: api+"/Order"
  }