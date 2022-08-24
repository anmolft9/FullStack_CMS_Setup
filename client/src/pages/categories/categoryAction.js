import React from "react";
import {
  deleteCategory,
  fetchCategory,
  postCategory,
  updateCategory,
} from "../../helpers/axiosHelper.js";
import { setCategories } from "./categorySlice";
import { toast } from "react-toastify";

export const getCategoriesAction = () => async (dispatch) => {
  const { status, categories } = await fetchCategory();
  //   console.log(categories);

  status === "success" && dispatch(setCategories(categories));
};

/////////////////
export const postCategoriesAction = (data) => async (dispatch) => {
  const promisePending = postCategory(data);
  toast.promise(promisePending, { pending: "please wait...." });
  //   console.log(categories);

  const { status, message } = await promisePending;
  toast[status](message);

  status === "success" && dispatch(getCategoriesAction());
};

export const updateCategoriesAction = (data) => async (dispatch) => {
  const promisePending = updateCategory(data);
  toast.promise(promisePending, { pending: "please wait...." });
  //   console.log(categories);

  const { status, message } = await promisePending;
  toast[status](message);

  status === "success" && dispatch(getCategoriesAction());
};

///delete
export const deleteCategoryAction = (_id) => async (dispatch) => {
  const promisePending = deleteCategory(_id);
  toast.promise(promisePending, { pending: "please wait...." });
  //   console.log(categories);

  const { status, message } = await promisePending;
  toast[status](message);

  status === "success" && dispatch(getCategoriesAction());
};
