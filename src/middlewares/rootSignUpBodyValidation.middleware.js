import { signUpModel } from "../models/signUp.model.js";
import { rootUsersCollection } from "../database/db.js";

export async function rootSignUpBodyValidation(req, res, next) {
  const user = req.body;
  const { error } = signUpModel.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  const userExists = await rootUsersCollection.findOne({ email: user.email });
  if (userExists) {
    return res.status(409).send({ message: "Esse usuário Root já existe" });
  }

  next();
}