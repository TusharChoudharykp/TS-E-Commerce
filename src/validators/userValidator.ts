import Joi from "joi";

const registerUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().min(10).max(15).required(),
  role: Joi.string().valid("user", "admin").optional(),
  landmark: Joi.string().optional(),
  flatnumber: Joi.string().optional(),
  pincode: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  phone: Joi.string().min(10).max(15).optional(),
  role: Joi.string().valid("user", "admin").optional(),
  landmark: Joi.string().optional(),
  flatnumber: Joi.string().optional(),
  pincode: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
});

export { registerUserSchema, loginUserSchema, updateUserSchema };
