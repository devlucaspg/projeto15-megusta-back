import { signUpModel } from "../models/signUp.model.js";
import { usersCollection } from "../database/db.js";

export async function signUpBodyValidation(req, res, next) {
  const user = req.body;
  const { error } = signUpModel.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    console.log("SignUpBodyValidation")
    console.log(errors)
    return res.status(401).send(errors);
  }

  const userExists = await usersCollection.findOne({ email: user.email });
  if (userExists) {
    return res.status(409).send({ message: "Esse usuário já existe" });
  }

  next();
}