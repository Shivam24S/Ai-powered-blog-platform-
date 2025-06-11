import express from "express";
import joi from "joi";

import userController from "../controller/userController.js";
import validateSchema from "../middlewares/validateSchema.js";
import {
  userValidationSchema,
  userOptionalValidation,
} from "../validations/userValidation.js";
import auth from "../middlewares/auth.js";
import authLimiter from "../middlewares/authLimiter.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/registerUser",
  upload.single("profilePic"),
  validateSchema(userValidationSchema),

  userController.registerUser
);

router.get("/users", auth, userController.users);

router.get("/me", auth, userController.user);

router.patch(
  "/",
  auth,
  upload.single("profilePic"),
  validateSchema(userOptionalValidation),
  authLimiter,
  userController.updateUser
);

router.delete("/deleteProfile", auth, userController.deleteUser);

router.delete("/users", auth, userController.deleteAllUser);

router.post(
  "/login",
  validateSchema(
    joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    })
  ),
  authLimiter,
  userController.login
);

router.post("/logout", auth, userController.logout);

router.post("/logoutAllSession", auth, userController.logoutAllSession);

export default router;
