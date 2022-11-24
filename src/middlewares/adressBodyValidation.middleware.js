import { adressModel } from "../models/adress.model.js";

export async function adressBodyValidation(req, res, next) {
  const adress = req.body;
  const { error } = adressModel.validate(adress, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }
  
  next();
}
