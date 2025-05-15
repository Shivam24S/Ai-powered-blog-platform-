import mongoose, { version } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
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
    type: Buffer,
  },
  Blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

// hashing password

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// attaching virtual property to userSchema _id to id
UserSchema.virtual("id", () => {
  return this._id.toHexString();
});

// deleting _id and password from the response
UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id, delete ret.password;
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
