import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinaryConfig from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryConfig,
  params: {
    folder: "ai_blog_platform",
    allowed_formats: ["jpg", "png", "jpeg", "heic", "mp4"],
    resource_type: "auto",
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });

export default upload;
