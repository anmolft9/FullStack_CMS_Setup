import categorySchema from "./categorySchema";

//insert categorySchema
export const insertCategory = (obj) => {
  return categorySchema(obj).save();
};
