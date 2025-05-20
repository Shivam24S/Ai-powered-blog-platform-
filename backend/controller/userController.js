import User from "../models/User.js";
import HttpError from "../middlewares/errorHandler.js";

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    let profilePic = null;

    if (req.file) {
      profilePic = req.file.path;
    }

    if (user) {
      return next(new HttpError("userAlready exist", 409));
    }

    const userData = new User({ name, email, password, profilePic });

    await userData.save();
    const token = await userData.generateAuthToken();
    res
      .status(201)
      .json({ message: "user created successfully", user: userData, token });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const users = async (req, res, next) => {
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

const user = async (req, res, next) => {
  try {
    const requestedUser = req.user;

    const user = await User.findById(requestedUser._id);

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
    const requestedUser = req.user;

    const user = await User.findById(requestedUser._id);

    if (!user) {
      return next(new HttpError("user not found", 404));
    }

    const updates = Object.keys(req.body);

    const allowedUpdate = ["name", "email", "password"];

    const isValidUpdate = updates.every((update) =>
      allowedUpdate.includes(update)
    );

    if (!isValidUpdate) {
      return next(new HttpError("only allowed field can be edit", 400));
    }

    if (req.file && req.file.path) {
      user.profilePic = req.file.path;
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
    const requestedUser = req.user;

    const deleteUser = await User.findByIdAndDelete(requestedUser._id);

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

    if (!deleteUsers || deleteUsers.deletedCount === 0) {
      return next(new HttpError("failed to delete all Users", 500));
    }

    res.status(200).json({ message: "all user deleted successfully" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

// login user

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredential(email, password);

    if (!user) {
      return next(new HttpError("unauthorized access", 401));
    }

    const token = await user.generateAuthToken();

    res.status(200).json({ message: "user log in successfully", user, token });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.status(200).json({ message: "user log out successfully" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const logoutAllSession = async (req, res, next) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.status(200).json({ message: "user log out from all session" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default {
  registerUser,
  users,
  user,
  updateUser,
  deleteUser,
  deleteAllUser,
  login,
  logout,
  logoutAllSession,
};
