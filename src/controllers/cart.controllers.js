import { ObjectId } from "mongodb";
import { cartCollection, productsCollection } from "../database/db.js";

export async function cart(req, res) {
  const userId = res.locals.user;
  try {
    const cart = await cartCollection
      .find({ userId: userId.toString() })
      .sort({ name: 1 })
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
    const product = await cartCollection
      .find({
        userId: userId.toString(),
      })
      .filter({
        productId: productId.toString(),
      })
      .toArray();

    if (product.length === 0) {
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
    }

    if (product.length > 0) {
      await cartCollection.updateOne(
        { _id: new ObjectId(product[0]._id) },
        { $set: { quantity: Number(product[0].quantity) + Number(quantity) } }
      );
      return res.status(201).send("Produto já no carrinho. Quantidade atualizada!");
    }

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}