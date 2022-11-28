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
    const products = await productsCollection.findOne({ _id: new ObjectId(id) });
        
    if (products.length === 0) {
      return res.status(404).send("Produto não encontrado! - (3)");
    }
    res.send(products);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function productSection(req, res) {
  const {section} = req.params;
  console.log(section)
  try{
    const products = await productsCollection.find({category: section}).toArray();
    if(products.length === 0){
      return res.status(404).send("Produto não encontrado! - (4)");
    }
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
