import express from "express";
import joi from "joi";

import userController from "../controller/userController.js";
import validateSchema from "../middlewares/validateSchema.js";
import {
  userValidationSchema,
  userOptionalValidation,
} from "../validation/userValidation.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/registerUser",
  validateSchema(userValidationSchema),
  userController.registerUser
);

router.get("/users", auth, userController.users);

router.get("/me", auth, userController.user);

router.patch(
  "/",
  auth,
  validateSchema(userOptionalValidation),
  userController.updateUser
);

router.delete("/", auth, userController.deleteUser);

router.delete("/users", auth, userController.deleteAllUser);

router.post(
  "/login",
  validateSchema(
    joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    })
  ),
  userController.login
);

export default router;
