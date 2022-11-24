import { Router } from "express";
import { products, addProducts } from "../controllers/products.controllers.js";
import { productBodyValidation } from "../middleware/productBodyValidation.middleware.js";

const router = Router();

router.get("/home", products);
router.post("/add-product", productBodyValidation, addProducts);

export default router;