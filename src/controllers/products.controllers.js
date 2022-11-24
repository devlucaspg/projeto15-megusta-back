import { ObjectId } from "mongodb";
import { productsCollection } from "../database/db.js";

export async function products(req, res) {
  try {
    const products = await productsCollection
      .find()
      .filter({ stock: true })
      .toArray();
    res.send(products);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function productId(req, res) {
  const { id } = req.params;
  try {
    const products = await productsCollection.find({ _id: ObjectId }).toArray();
    res.send(products);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function addProducts(req, res) {
  const product = req.body;
  const rootUser = res.locals.rootUser;
  if (!rootUser) {
    res.send(401);
  }
  try {
    await productsCollection.insertOne({ ...product });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
