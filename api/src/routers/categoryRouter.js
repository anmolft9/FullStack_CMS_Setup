import express from "express";
import { newCategoryValidation } from "../middlewares/joiValidation/joiValidation.js";
import { insertCategory } from "../models/admin/category/categoryModel.js";
import slugify from "slugify";

const router = express.Router();

///insert new category
router.post("/", newCategoryValidation, async (req, res, next) => {
  try {
    // console.log(req.body);
    req.body.slug = slugify(req.body.name, { lower: true, trim: true });
    const result = await insertCategory(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "category added",
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
