import React from "react";
import { fetchCategory, postCategory } from "../../helpers/axiosHelper";
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
