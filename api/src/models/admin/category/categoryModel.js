import categorySchema from "./categorySchema.js";

//insert categorySchema
export const insertCategory = (obj) => {
  return categorySchema(obj).save();
};

export const getAllCategories = () => {
  return categorySchema.find();
};

export const getCategoryById = (_id) => {
  return categorySchema.findById(_id);
};
