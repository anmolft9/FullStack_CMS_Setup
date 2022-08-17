import express from "express";
import { insertCategory } from "../models/admin/category/categoryModel";

const router = express.Router();

///insert new category
router.post("/", async (req, res, next) => {
  try {
    // console.log(req.body);
    const result = await insertCategory(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "category list",
        })
      : res.json({
          status: "error",
          message: "category not found",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
