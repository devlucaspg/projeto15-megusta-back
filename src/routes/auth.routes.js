import { Router } from "express";
import { adress } from "../controllers/adress.controllers.js";
import { signIn, signUp } from "../controllers/auth.controllers.js";
import { signInBodyValidation } from "../middlewares/signInBodyValidation.middleware.js";
import { signUpBodyValidation } from "../middlewares/signUpBodyValidation.middleware.js";
import { adressBodyValidation } from "../middleware/adressBodyValidation.middleware.js"

const router = Router();

router.post("/sign-in", signInBodyValidation, signIn);
router.post("/sign-up", signUpBodyValidation, signUp);
router.post("/adress", adressBodyValidation, adress);

export default router;