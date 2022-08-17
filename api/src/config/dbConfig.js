import mongoose from "mongoose";

export const dbConnection = () => {
  try {
    const conStr = process.env.MONGO_CLIENT;
    if (!conStr) {
      return console.log("No connection in process.env.MONGO_CLIENT");
    }
    const conn = mongoose.connect(conStr);

    conn && console.log("mongo connected");
  } catch (error) {
    console.log(error);
  }
};
