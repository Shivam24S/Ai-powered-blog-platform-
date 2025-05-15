import User from "../models/User.js";
import HttpError from "../middlewares/errorHandler.js";

const registerUser = async (req, res, next) => {
  try {
    const user = await User.findOne(req.email);

    if (user) {
      return next(HttpError("userAlready exist", 500));
    }

    const userData = new User(req.body);

    await userData.save();
    res.status(201).json({ message: "user created successfully", userData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default { registerUser };
