import express from "express";
import {
  newCategoryValidation,
  updateCategoryValidation,
} from "../middlewares/joiValidation/joiValidation.js";
import {
  deleteCategory,
  getAllCategories,
  getCategoryById,
  hasChildCategory,
  insertCategory,
  updateCategoryById,
} from "../models/admin/category/categoryModel.js";
import slugify from "slugify";

const router = express.Router();

///get category
router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const categories = _id
      ? await getCategoryById(_id)
      : await getAllCategories();

    res.json({
      status: "success",
      message: "Category list",
      categories,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

///insert category
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

///update category

router.put("/", updateCategoryValidation, async (req, res, next) => {
  try {
    const hasChildCat = await hasChildCategory(req.body._id);
    if (hasChildCat) {
      return res.json({
        status: "error",
        message:
          "this category has child categories, please delete or reassign them to another category before taking this action",
      });
    }

    console.log(req.body, "ghvbnvbnvbnnnnnnnnnnnnnnnn");
    const catUpdate = await updateCategoryById(req.body);

    res.json({
      status: "success",
      message: "category updated",
    });
  } catch (error) {
    next(error);
  }
});

///delete category
router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const hasChildCat = await hasChildCategory(_id);
    if (hasChildCat) {
      return res.json({
        status: "error",
        message: "this category has been deleted",
      });
    }

    // console.log(req.body, "ghvbnvbnvbnnnnnnnnnnnnnnnn");
    const catDelete = await deleteCategory(_id);
    catDelete?._id
      ? res.json({
          status: "success",
          message: "category deleted",
        })
      : res.json({
          status: "error",
          message: "category not delete",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
