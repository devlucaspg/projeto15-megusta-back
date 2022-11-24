import { Router } from "express";
import { adress } from "../controllers/adress.controllers.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";
import { adressBodyValidation } from "../middlewares/adressBodyValidation.middleware.js";

const router = Router();

router.post("/adress", authValidation, adressBodyValidation, adress);

export default router;