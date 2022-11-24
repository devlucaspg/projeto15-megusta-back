import { adressCollection } from "../database/db.js";

export async function adress(req, res) {
  const adress = req.body;
  const userExists = res.locals.userSignIn;

  try {
    delete userExists.password;
    await adressCollection.insertOne({ ...adress, userId: userExists._id });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
