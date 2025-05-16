import HttpError from "./errorHandler.js";

const validateSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return next(new HttpError(error.details[0].message, 400));
  }
  next();
};

export default validateSchema;
