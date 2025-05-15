import User from "../models/User.js";
import HttpError from "../middlewares/errorHandler.js";

const registerUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return next(new HttpError("userAlready exist", 409));
    }

    const userData = new User(req.body);

    await userData.save();
    res.status(201).json({ message: "user created successfully", userData });
  } catch (error) {
    return next(new HttpError(error.message, 400));
  }
};

export default { registerUser };
