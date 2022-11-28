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
console.log(productId)
  try {
    const cartProduct = await cartCollection
      .find({
        userId: userId.toString(),
      })
      .filter({
        productId: productId.toString(),
      })
      .toArray();

    const product = await productsCollection.findOne({ _id: new ObjectId(productId) });
    if (!product) {
      console.log(product)
      return res.status(404).send("Produto não encontrado!")
    }

    if (cartProduct.length === 0) {
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

    if (cartProduct.length > 0) {
      await cartCollection.updateOne(
        { _id: new ObjectId(cartProduct[0]._id) },
        {
          $set: {
            quantity: Number(cartProduct[0].quantity) + Number(quantity),
          },
        }
      );
      return res
        .status(201)
        .send("Produto já no carrinho. Quantidade atualizada!");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
