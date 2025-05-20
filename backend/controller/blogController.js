import mongoose from "mongoose";

import Blog from "../models/Blog.js";
import HttpError from "../middlewares/errorHandler.js";
import User from "../models/User.js";
import summarizeContent from "../utils/summarizeContent.js";

const addBlog = async (req, res, next) => {
  try {
    const requestedUser = req.user;

    const user = await User.findById(requestedUser._id);

    if (!user) {
      return next(new HttpError("please authenticate to add Blog", 404));
    }

    const { title, description } = req.body;

    let blogPic = null;

    if (req.file) {
      blogPic = req.file.path;
    }

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

const updateBlog = async (req, res, next) => {
  try {
    const requestedUser = req.user;

    const id = req.params.id;

    const blog = await Blog.findById(id);

    if (!blog) {
      return next(new HttpError("blog not found", 404));
    }

    if (blog.user.toString() !== requestedUser._id.toString()) {
      return next(
        new HttpError("you are not authorized to edit this blog", 400)
      );
    }

    const updates = Object.keys(req.body);

    const allowedUpdates = ["title", "description"];

    const isValidUpdates = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidUpdates) {
      return next(new HttpError("only allowed field can be updates", 400));
    }

    updates.forEach((update) => {
      blog[update] = req.body[update];
    });

    await blog.save();

    res.status(200).json({ message: "blog updated successfully", blog });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getBlog = async (req, res, next) => {
  try {
    const id = req.params.id;

    const blog = await Blog.findById(id);

    if (!blog) {
      return next(new HttpError("blog not found", 404));
    }

    res.status(200).json(blog);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  let blog = null;
  try {
    blog = await Blog.findById(id).populate("user");

    if (!blog) {
      return next(new HttpError("blog not found", 404));
    }

    if (blog.user._id.toString() !== req.user._id.toString()) {
      return next(
        new HttpError("you are not allowed to delete this blog", 400)
      );
    }
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }

  mongoose.connection.transaction(async (session) => {
    await blog.deleteOne({ session });
    blog.user.Blogs.pull(blog);
    await blog.user.save({ session });
  });
  res.status(200).json({ message: "blog deleted successfully" });
};

const summarizeBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return next(new HttpError("Blog not found", 404));

    const summary = await summarizeContent(blog.description);

    if (!summary) {
      return next(new HttpError("failed to generate summary", 500));
    }
    return res
      .status(201)
      .json({ message: "summary generated successfully", summary });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default {
  addBlog,
  blogs,
  updateBlog,
  deleteBlog,
  getBlog,
  summarizeBlog,
};
