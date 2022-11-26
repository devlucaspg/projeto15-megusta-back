import { ObjectId } from "mongodb";
import { cartCollection, productsCollection } from "../database/db.js";

export async function cart(req, res) {
  const userId = res.locals.user;
  try {
    const cart = await cartCollection
      .find({ userId: userId.toString() })
      .toArray();
    res.send(cart);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function addToCart(req, res) {
  const { productId, quantity } = req.body;
  const userId = res.locals.user;

  try {
    const product = await productsCollection.findOne({
      _id: new ObjectId(productId),
    });
    console.log(product);
    if (product?.length === 0) {
      return res.status(404).send("Produto não encontrado");
    }
    
    await cartCollection.insertOne({ 
      productId: productId.toString(),
      userId: userId.toString(),
      quantity: quantity,
      price: product.price,
      name: product.name,
      imageLink: product.imageLink,
      description: product.description,
      category: product.category,
      stock: product.stock,
     });
    return res.status(201).send("Produto adicionado ao carrinho!");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
