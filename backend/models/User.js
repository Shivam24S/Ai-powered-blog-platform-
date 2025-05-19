import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpError from "../middlewares/errorHandler.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        throw new Error("invalid email format");
      }
    },
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain 'password' word as password");
      }
    },
  },
  profilePic: {
    type: String,
  },
  Blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

// hashing password

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// attaching virtual property to userSchema _id to id
userSchema.virtual("id", () => {
  return this._id.toHexString();
});

// deleting _id and password from the response
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id, delete ret.password;
    delete ret.tokens;

    return ret;
  },
});

// generating jwt token

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

userSchema.statics.findByCredential = async function (email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError("invalid credential", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new HttpError("invalid credential", 401);
  }
  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
