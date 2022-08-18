import axios from "axios";
const rooturl = process.env.REACT_APP_API_ENDPOINT;
const adminUserEP = rooturl + "admin-user";
const categoryEP = "http://localhost:8000/api/v1/category";

const apiProcessor = async ({ method, url, data }) => {
  try {
    const response = await axios({
      method,
      url,
      data,
    });

    return response.data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

///post new  admin user
export const postUser = (data) => {
  const option = {
    method: "post",
    url: adminUserEP,
    data,
  };
  return apiProcessor(option);
};

export const emailVerifyAdminUser = (data) => {
  const option = {
    method: "patch",
    url: adminUserEP + "/verify-email",
    data,
  };
  return apiProcessor(option);
};
export const loginAdminUser = (data) => {
  const option = {
    method: "post",
    url: adminUserEP + "/login",
    data,
  };
  return apiProcessor(option);
};

export const fetchCategory = (_id) => {
  const option = {
    method: "get",
    url: _id ? categoryEP + "/" + _id : categoryEP,
  };
  return apiProcessor(option);
};

///post new category
export const postCategory = (obj) => {
  const option = {
    method: "post",
    url: categoryEP,
    data: obj,
  };
  return apiProcessor(option);
};
