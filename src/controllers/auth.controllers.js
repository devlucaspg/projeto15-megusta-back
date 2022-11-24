import bcrypt from "bcrypt";
import { usersCollection, sessionsCollection, rootUsersCollection } from "../database/db.js";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const user = req.body;

  try {
    const hashPassword = bcrypt.hashSync(user.password, 10);
    delete user.confirmPassword;
    await usersCollection.insertOne({ ...user, password: hashPassword });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { email } = req.body;
  const token = uuid();

  try {
    const userExists = await usersCollection.findOne({ email });
    delete userExists.password;
    await sessionsCollection.insertOne({
      token,
      userId: userExists._id,
    });

    res.send({ ...userExists, token });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function rootSignIn(req, res) {
  const { email } = req.body;
  const token = uuid();

  try {
    const rootUserExists = await rootUsersCollection.findOne({ email });
    delete rootUserExists.password;
    await sessionsCollection.insertOne({
      token,
      userId: rootUserExists._id,
    });

    res.send({ ...rootUserExists, token });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}