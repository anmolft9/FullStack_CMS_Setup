import sessionSchema from "./SessionSchema.js";

export const insertSession = (obj) => {
  return sessionSchema(obj).save();
};
