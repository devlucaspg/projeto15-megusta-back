import { Router } from "express";
import { cart, addToCart, removeFromCart } from "../controllers/cart.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const router = Router();

router.get("/cart", authValidation, cart);
router.post("/cart", authValidation, addToCart);
router.delete("/cart/:productId", authValidation, removeFromCart);

export default router;
