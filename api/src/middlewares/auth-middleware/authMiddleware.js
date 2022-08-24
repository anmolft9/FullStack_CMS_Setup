import { decode } from "jsonwebtoken";
import { verifyAccessJWT } from "../../helpers/jwtHelper.js";
import { findOneAdminUser } from "../../models/admin/AdminUserModel.js";
import { getSession } from "../../models/admin/session/SessionModel.js";

export const adminAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const decoded = await verifyAccessJWT(authorization);

      if (decoded === " jwt expired") {
        return res.status(403).json({
          status: "error",
          message: "JWT expired",
        });
      }

      if (decoded?.email) {
        const existInDB = await getSession({
          type: "jwt",
          token: authorization,
        });
        if (existInDB?._id) {
          const adminInfo = await findOneAdminUser({ email: decoded.email });
          if (adminInfo?._id) {
            req.adminInfo = adminInfo;
            return next();
          }
          return;
        }
      }
    }
    res.status(401).json({
      status: "error",
      message: "unauthorized",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};
