import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().positive().required(),
  category_id: Joi.number().required(),
  stock: Joi.number().integer().min(0).required(),
  image: Joi.string().optional(),
});
