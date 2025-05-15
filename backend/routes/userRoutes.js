import express from "express";
import userController from "../controller/userController.js";

const router = express.Router();

router.post("/registerUser", userController.registerUser);

router.get("/allUser", userController.GetAllUser);

router.get("/getUserById/:id", userController.getUser);

router.patch("/updateUser/:id", userController.updateUser);

router.delete("/deleteUser/:id", userController.deleteUser);

router.delete("/deleteAllUser", userController.deleteAllUser);

export default router;
