import { rootUsersCollection } from "../database/db.js";
import bcrypt from "bcrypt";

export async function rootSignInBodyValidation(req, res, next) {
  const { email, password } = req.body;

  const rootUserExists = await rootUsersCollection.findOne({ email });
  if (!rootUserExists) {
    return res.sendStatus(401);
  }

  const passwordOk = bcrypt.compareSync(password, rootUserExists.password);
  if (!passwordOk) {
    return res.sendStatus(401);
  }

  res.locals.rootUserSignIn = rootUserExists;

  next();
}