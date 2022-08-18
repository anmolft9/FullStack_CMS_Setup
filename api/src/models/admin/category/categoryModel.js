import categorySchema from "./categorySchema.js";

//insert categorySchema
export const insertCategory = (obj) => {
  return categorySchema(obj).save();
};
