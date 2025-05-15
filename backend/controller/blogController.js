import Blog from "../models/Blog.js";
import HttpError from "../middlewares/errorHandler.js";

const addBlog = async (req, res, next) => {
  try {
    const { title, description, blogPic, user } = req.body;

    const newBlog = new Blog({
      title,
      description,
      blogPic,
      user,
    });

    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully", newBlog });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { addBlog };
