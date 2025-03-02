import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().min(3).required(),
  icon: Joi.string().uri().required(), // Icon should be a valid URL
  color: Joi.string().min(3).required(),
  text: Joi.string().min(5).required(),
});

export { categorySchema };
