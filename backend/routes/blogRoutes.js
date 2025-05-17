import express from "express";

import auth from "../middlewares/auth.js";
import blogController from "../controller/blogController.js";
import validateSchema from "../middlewares/validateSchema.js";
import {
  blogValidation,
  updateBlogValidation,
} from "../validation/blogValidation.js";

const router = express.Router();

router.post(
  "/addBlog",
  auth,
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

export default router;
