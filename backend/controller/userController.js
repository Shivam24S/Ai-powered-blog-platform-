import User from "../models/User.js";
import HttpError from "../middlewares/errorHandler.js";

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
    return next(new HttpError(error.message, 500));
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
    return next(new HttpError(error.message, 500));
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
    return next(new HttpError(error.message, 500));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      return next(new HttpError("user not found", 404));
    }

    const updates = Object.keys(req.body);

    const allowedUpdate = ["name", "email", "password", "profilePic"];

    const isValidUpdate = updates.every((update) =>
      allowedUpdate.includes(update)
    );

    if (!isValidUpdate) {
      return next(new HttpError("only allowed field can be edit", 400));
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.status(200).json({ message: "user data updated successfully", user });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
      return next(new HttpError("failed to delete user", 400));
    }

    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteAllUser = async (req, res, next) => {
  try {
    const deleteUsers = await User.deleteMany({});

    if (!deleteAllUser) {
      return next(new HttpError("failed to delete all Users", 500));
    }

    res.status(200).json({ message: "all user deleted successfully" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default {
  registerUser,
  GetAllUser,
  getUser,
  updateUser,
  deleteUser,
  deleteAllUser,
};
