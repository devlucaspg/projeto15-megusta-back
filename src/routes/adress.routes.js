import { Router } from "express";
import { adress, getAdress } from "../controllers/adress.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { adressBodyValidation } from "../middlewares/adressBodyValidation.middleware.js";

const router = Router();

router.post("/adress", authValidation, adressBodyValidation, adress);
router.get("/adress", authValidation, getAdress);

export default router;