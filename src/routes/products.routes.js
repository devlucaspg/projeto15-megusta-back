import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { products, productId, addProducts } from "../controllers/products.controllers.js";
import { productBodyValidation } from "../middlewares/productBodyValidation.middleware.js";

const router = Router();

router.get("/products", products);
router.get("/products/:id", productId);
router.post("/add-product", authValidation, productBodyValidation, addProducts);

export default router;
