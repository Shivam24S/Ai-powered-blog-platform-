import jwt from "jsonwebtoken";

import HttpError from "./errorHandler.js";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new HttpError("authorization failed", 401));
    }

    const token = authHeader.replace("Bearer ", "");

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return next(new HttpError("authorization failed", 401));
    }

    const user = await User.findOne({
      _id: decode.id,
      "tokens.token": token,
    });

    if (!user) {
      return next(new HttpError("authorization failed", 401));
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return next(new HttpError("authorization failed", 401));
  }
};

export default auth;
