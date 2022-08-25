import express from "express";
import {
  newPaymentMethodValidation,
  updatePaymentMethodValidation,
} from "../middlewares/joiValidation/joiValidation.js";
import {
  deletePaymentMethod,
  getPaymentMethod,
  insertPaymentMethod,
  updatePaymentMethodById,
} from "../models/payment-method/PaymentMethodModel.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const pm = await getPaymentMethod();

    res.json({
      status: "success",
      message: "todo get",
      pm,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

///post
router.post("/", newPaymentMethodValidation, async (req, res, next) => {
  try {
    const pm = await insertPaymentMethod(req.body);
    pm?._id
      ? res.json({
          status: "success",
          message: "payment method added successfully",
        })
      : res.json({
          status: "error",
          message: "payment method could not be added",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 400;
      error.message = "Payment method already exists";
    }
    next(error);
  }
});

router.put("/", updatePaymentMethodValidation, async (req, res, next) => {
  try {
    console.log(req.body);
    const pm = await updatePaymentMethodById(req.body);
    pm?._id
      ? res.json({
          status: "success",
          message: "updated payment method added successfully",
        })
      : res.json({
          status: "error",
          message: "Couldnt update payment method",
        });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

///delete
router.delete(
  "/:_id",
  updatePaymentMethodValidation,
  async (req, res, next) => {
    try {
      const { _id } = req.params;
      console.log(_id);
      const pm = await deletePaymentMethod(_id);
      pm?._id
        ? res.json({
            status: "success",
            message: "deleted payment method added successfully",
          })
        : res.json({
            status: "error",
            message: "Couldnt delete payment method",
          });
    } catch (error) {
      error.status = 500;
      next(error);
    }
  }
);

export default router;
