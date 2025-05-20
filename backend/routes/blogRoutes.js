import express from "express";

import auth from "../middlewares/auth.js";
import blogController from "../controller/blogController.js";
import validateSchema from "../middlewares/validateSchema.js";
import {
  blogValidation,
  updateBlogValidation,
} from "../validations/blogValidation.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/addBlog",
  auth,
  upload.single("blogPic"),
  validateSchema(blogValidation),
  blogController.addBlog
);

router.get("/blogs", blogController.blogs);

router.patch(
  "/:id",
  auth,
  validateSchema(updateBlogValidation),
  blogController.updateBlog
);

router.delete("/:id", auth, blogController.deleteBlog);

router.get("/:id", blogController.getBlog);

router.post("/:id", auth, blogController.summarizeBlog);

export default router;
