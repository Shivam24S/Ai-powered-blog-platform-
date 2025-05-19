import joi from "joi";

const userValidationSchema = joi.object({
  name: joi.string().min(3).max(30).required().messages({
    "string.empty": "Name is required",
  }),
  email: joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must be 3–30 characters (letters/numbers only)",
    }),
});

const userOptionalValidation = userValidationSchema.fork(
  ["name", "email", "password"],
  (schema) => schema.optional()
);

export { userValidationSchema, userOptionalValidation };
