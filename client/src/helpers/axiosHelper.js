import axios from "axios";
const rooturl = process.env.REACT_APP_API_ENDPOINT;
const adminUserEP = rooturl + "admin-user";
const categoryEP = "http://localhost:8000/api/v1/category";

const apiProcessor = async ({ method, url, data, isPrivate }) => {
  try {
    const headers = isPrivate
      ? {
          Authorization: sessionStorage.getItem("accessJWT"),
        }
      : null;
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    return {
      status: "success",
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

///////category api
export const fetchCategory = (_id) => {
  const option = {
    method: "get",
    url: _id ? categoryEP + "/" + _id : categoryEP,
    isPrivate: true,
  };
  return apiProcessor(option);
};

///post new category
export const postCategory = (obj) => {
  const option = {
    method: "post",
    url: categoryEP,
    data: obj,
    isPrivate: true,
  };
  return apiProcessor(option);
};

///update category
export const updateCategory = (obj) => {
  const option = {
    method: "put",
    url: categoryEP,
    data: obj,
    isPrivate: true,
  };
  return apiProcessor(option);
};

///delete category
export const deleteCategory = (_id) => {
  const option = {
    method: "delete",
    url: categoryEP + "/" + _id,
    isPrivate: true,
  };
  return apiProcessor(option);
};
