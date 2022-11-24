import { adressModel } from "../models/adress.model.js";
import { adressCollection } from "../database/db.js";

export async function signUpBodyValidation(req, res, next) {
  const adress = req.body;
  const { error } = adressModel.validate(adress, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  const adressExists = await adressCollection
    .filter({ userId: adress.userId })
    .filter({ postalCode: adress.postalCode })
    .filter({ number: adress.number });
  if (adressExists) {
    return res
      .status(409)
      .send({ message: "Este endereço já está cadastrado" });
  }

  next();
}
