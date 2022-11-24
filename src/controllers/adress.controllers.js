import { adressCollection } from "../database/db.js";

export async function adress(req, res) {
  const adress = req.body;
  const user = res.locals.user;

  try {
    delete user.password;
    await adressCollection.insertOne({ ...adress, userId: user });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
