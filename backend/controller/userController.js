import User from "../models/User.js";
import HttpError from "../middlewares/errorHandler.js";
import { json } from "express";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, profilePic } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return next(new HttpError("userAlready exist", 409));
    }

    const userData = new User({ name, email, password, profilePic });

    await userData.save();
    res.status(201).json({ message: "user created successfully", userData });
  } catch (error) {
    return next(new HttpError(error.message, 400));
  }
};

const GetAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});

    if (!users) {
      return next(new HttpError("no users found", 404));
    }
    return res.status(200).json({ allUsers: users });
  } catch (error) {
    return next(new HttpError(error.message, 400));
  }
};

const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      return next(new HttpError("user not found", 404));
    }
    return res.status(200).json({ user });
  } catch (error) {
    return next(new HttpError(error.message, 400));
  }
};

export default { registerUser, GetAllUser, getUser };
