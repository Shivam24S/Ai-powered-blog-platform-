import rateLimit from "express-rate-limit";

// Limit: Max 5 requests per IP every 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    status: 429,
    message: "Too many login/signup attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default authLimiter;
