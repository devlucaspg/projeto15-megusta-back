import { productsCollection } from "../database/db";

export async function products(req, res) {
  const products = await productsCollection
    .find()
    .filter({ stock: true })
    .toArray();
  res.send(products);
}

export async function addProducts(req, res) {
  const product = req.body;
  
  try {
    await productsCollection.insertOne({ ...product });
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
