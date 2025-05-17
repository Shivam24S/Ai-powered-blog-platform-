import mongoose from "mongoose";

import Blog from "../models/Blog.js";
import HttpError from "../middlewares/errorHandler.js";
import User from "../models/User.js";

const addBlog = async (req, res, next) => {
  try {
    const requestedUser = req.user;

    const user = await User.findById(requestedUser._id);

    if (!user) {
      return next(new HttpError("please authenticate to add Blog", 404));
    }

    const { title, description, blogPic } = req.body;

    const newBlog = new Blog({
      title,
      description,
      blogPic,
      user: user._id,
    });

    try {
      await mongoose.connection.transaction(async (session) => {
        await newBlog.save({ session });

        if (!user.Blogs) {
          user.Blogs = [];
        }
        user.Blogs.push(newBlog);
        await user.save({ session });
      });
    } catch (error) {
      return next(new HttpError(error.message, 500));
    }

    res.status(201).json({ message: "Blog created successfully", newBlog });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const blogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({});

    if (!blogs) {
      return next(new HttpError("no blogs found", 404));
    }
    res.status(200).json({ blogs });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { addBlog, blogs };
