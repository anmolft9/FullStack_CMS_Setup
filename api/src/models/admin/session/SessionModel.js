import sessionSchema from "./SessionSchema.js";

export const insertSession = (obj) => {
  return sessionSchema(obj).save();
};

///filter mus be an object
export const getSession = (filter) => {
  return sessionSchema.findOne(filter);
};

///filter mus be an object
export const deleteSession = (filter) => {
  return sessionSchema.findOneAndDelete(filter);
};
