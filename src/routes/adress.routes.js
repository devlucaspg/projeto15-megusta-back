import { Router } from "express";
import { adress } from "../controllers/adress.controllers.js";
import { adressBodyValidation } from "../middleware/adressBodyValidation.middleware.js";

const router = Router();

router.post("/adress", adressBodyValidation, adress);

export default router;