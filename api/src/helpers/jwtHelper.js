import jwt from "jsonwebtoken";
import { updateOneAdminUser } from "../models/admin/AdminUserModel.js";
import {
  deleteSession,
  insertSession,
} from "../models/admin/session/SessionModel.js";

export const signAccessJWT = async (payload) => {
  const accessJWT = jwt.sign(payload, process.env.JWT_ACEESS_SECRET, {
    expiresIn: "20m",
  });
  const obj = {
    token: accessJWT,
    type: "jwt",
  };
  await insertSession(obj);
  return accessJWT;
};

export const signRefreshJWT = async (payload) => {
  const refreshJWT = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  await updateOneAdminUser(payload, { refreshJWT });
  return refreshJWT;
};

export const createJWTs = async (payload) => {
  return {
    accessJWT: await signAccessJWT(payload),
    refreshJWT: await signRefreshJWT(payload),
  };
};

export const verifyAccessJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_ACEESS_SECRET);
  } catch ({ message }) {
    console.log(message);
    if (message === "jwt expired !") {
      ///delete jwt from session table
      deleteSession({
        type: "jwt",
        token,
      });
    }
    return message;
  }
};

export const verifyRefreshJWT = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
