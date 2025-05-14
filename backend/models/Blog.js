import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  BlogPic: {
    type: Buffer,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timeStamps: true,
});

const Blog = mongoose.model("Blog", BlogSchema);

export default Blog;
