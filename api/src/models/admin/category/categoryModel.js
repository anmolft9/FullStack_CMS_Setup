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

export const updateCategoryById = ({ _id, ...update }) => {
  console.log(update, _id, "==================");
  return categorySchema.findByIdAndUpdate(_id, update);
};

export const hasChildCategory = async (parentId) => {
  const cat = await categorySchema.findOne({ parentId });

  return cat?._id ? true : false;
};

///delete
export const deleteCategory = (_id) => {
  return categorySchema.findByIdAndDelete(_id);
};
