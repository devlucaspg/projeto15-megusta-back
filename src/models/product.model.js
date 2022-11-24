import joi from "joi";

export const productModel = joi.object({
  name: joi.string().min(3).required(),
  description: joi.string().min(3),
  price: joi.number().min(1).required(),
  imageLink: joi.string().uri().required(),
  category: joi.string().min(3).required(),
  stock: joi.boolean().valid(true).required(),
  quantity: joi.number().min(1).required(),
});