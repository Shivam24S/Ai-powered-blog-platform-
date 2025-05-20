import joi from "joi";

const blogValidation = joi.object({
  title: joi.string().min(3).max(40).required().messages({
    "string.empty": "title is required",
    "string.min": "title must be at least 3 characters",
    "any.required": "title is required",
  }),

  description: joi.string().min(3).required().messages({
    "string.empty": "description is required",
    "string.min": "description must be at least 3 characters",
    "any.required": "description is required",
  }),
});

const updateBlogValidation = blogValidation.fork(
  ["title", "description"],
  (schema) => schema.optional()
);

export { blogValidation, updateBlogValidation };
