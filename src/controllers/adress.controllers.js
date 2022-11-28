import { adressCollection } from "../database/db.js";

export async function adress(req, res) {
  const adress = req.body;
  const user = res.locals.user;

  try {
    delete user.password;
    await adressCollection.insertOne({ ...adress, userId: user.toString() });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getAdress(req, res) {
  const user = res.locals.user;

  try {
    const adress = await adressCollection.findOne({ userId: user.toString() });
    console.log(adress)
    res.send(adress);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
