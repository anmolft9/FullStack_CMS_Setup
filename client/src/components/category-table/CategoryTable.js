import React, { useEffect } from "react";
import { getCategoriesAction } from "../../pages/categories/categoryAction.js";
import { useDispatch } from "react-redux";

export const CategoryTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);
  return <div>CategoryTable</div>;
};
