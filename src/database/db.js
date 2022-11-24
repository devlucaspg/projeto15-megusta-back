import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  console.log("MongoDB successfully connected!");
} catch (err) {
  console.log(err);
}

const db = mongoClient.db("projeto15-megusta");
export const cartCollection = db.collection("cart");
export const usersCollection = db.collection("users");
export const adressCollection = db.collection("adress");
export const productsCollection = db.collection("products");
export const sessionsCollection = db.collection("sessions");
export const rootUsersCollection = db.collection("rootUsers");