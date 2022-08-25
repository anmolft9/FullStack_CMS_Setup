import axios from "axios";
const rooturl = process.env.REACT_APP_API_ENDPOINT;
const adminUserEP = rooturl + "admin-user";
const categoryEP = "http://localhost:8000/api/v1/category";

const apiProcessor = async ({ method, url, data, isPrivate, token }) => {
  try {
    const headers = isPrivate
      ? {
          Authorization: token || sessionStorage.getItem("accessJWT"),
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
    let message = error.message;
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");
    }

    if (error.response && error.response.data) {
      message = error.response.data.message;
    }

    if (message === "jwt expired") {
      //call thje api to get new accessJET and store in the session and recall the api Processor
      const accessJWT = await getNewAccessToken();

      if (accessJWT) {
        return apiProcessor({ method, url, data, isPrivate, token });
      }
    }

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

///login adming user
export const getAdminUser = (token) => {
  const option = {
    method: "get",
    url: adminUserEP,
    isPrivate: true,
    token,
  };
  return apiProcessor(option);
};

///fetch new token
export const getNewAccessToken = async () => {
  const token = localStorage.getItem("refreshJWT");
  const option = {
    method: "get",
    url: adminUserEP + "/accessjwt",
    isPrivate: true,
    token,
  };
  const { status, accessJWT } = await apiProcessor(option);
  status === "success" && sessionStorage.setItem("accessJWT", accessJWT);
  return accessJWT;
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
