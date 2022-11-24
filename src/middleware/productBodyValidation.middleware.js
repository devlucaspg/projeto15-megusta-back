import { productModel } from "../models/product.model";
import { productsCollection } from "../database/db.js";

export async function productBodyValidation(req, res, next) {
  const product = req.body;
  const { error } = productModel.validate(product, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  const productExists = await productsCollection
    .filter({ name: product.name })
  if (productExists) {
    return res.status(409).send({ message: "Já existe um produto cadastrado com este mesmo nome!" });
  }

  next();
}