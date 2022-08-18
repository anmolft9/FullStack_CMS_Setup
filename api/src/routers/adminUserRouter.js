import express from "express";
import { comparePassword, hashPassword } from "../helpers/bcryptHelper.js";
import {
  userVerifiednotification,
  verificationEmail,
} from "../helpers/emailHelper.js";
import {
  emailVerificationValidation,
  loginValidation,
  newAdminUserValidation,
} from "../middlewares/joiValidation/joiValidation.js";

import {
  findOneAdminUser,
  insertAdminUser,
  updateOneAdminUser,
} from "../models/admin/AdminUserModel.js";
import { v4 as uuidv4 } from "uuid";
import { createJWTs, signAccessJWT } from "../helpers/jwtHelper.js";

const router = express.Router();

////server side valiadation

//encrypt user pw

//insert into the db
//create unique verification code
//send create a like pointing to out drontend with the email and verification code and send to their email

router.post("/", newAdminUserValidation, async (req, res, next) => {
  try {
    // console.log(password);

    // const hashPass = hashPassword;

    const { password } = req.body;
    req.body.password = hashPassword(password);
    req.body.emailValidationCode = uuidv4();

    const user = await insertAdminUser(req.body);
    if (user?._id) {
      res.json({
        status: "success",
        message: "verification to you email, go fast",
      });
      const url = `${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailValidationCode}&e=${user.email}`;

      verificationEmail({
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        url,
      });
      return;
    }

    ///http://localhost:3000/admin/verify-email?c=

    res.json({
      status: "error",
      message: "unable to create new admin user,try again",
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/verify-email",
  emailVerificationValidation,
  async (req, res, next) => {
    try {
      const { emailValidationCode, email } = req.body;
      console.log(req.body, "lksdfjldsj");

      const user = await updateOneAdminUser(
        { emailValidationCode, email }, ///filter
        { status: "active", emailValidationCode: "" } ///update
      );
      console.log(user, "kljhg");
      user?._id
        ? res.json({
            status: "success",
            message: "Your acc has been verified, you may login in now",
          }) && userVerifiednotification(user)
        : res.json({
            status: "error",
            message: "invalid or expired link, no action was taken]",
          });

      res.json({
        status: "success",
        message: "verify email todo create new user",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/login", loginValidation, async (req, res, next) => {
  try {
    const { password, email } = req.body;

    //find user exist?

    const user = await findOneAdminUser({ email });
    if (user?._id) {
      if (user?.status !== "active") {
        ///we need to verify if the password send by the user and the hased password stored in our db is the same
        return res.json({
          status: "error",
          message: "not verified",
        });
      }

      const isMatched = comparePassword(password, user.password);
      if (isMatched) {
        user.password = undefined;
        ///jwt ready and send
        const jwt = await createJWTs({ email });

        return res.json({
          status: "success",
          message: "logged in successfully",
          user,
          ...jwt,
        });
      }
    }

    // user?._id
    //   ? res.json({
    //       status: "success",
    //       message: "Your acc has been verified, you may login in now",
    //     }) && userVerifiednotification(user)
    //   : res.json({
    //       status: "error",
    //       message: "invalid or expired link, no action was taken]",
    //     });

    res.json({
      status: "error",
      message: "not valid login credentials",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
