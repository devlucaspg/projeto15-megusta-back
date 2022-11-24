import { Router } from "express";
import { signIn, signUp, rootSignIn } from "../controllers/auth.controllers.js";
import { signInBodyValidation } from "../middlewares/signInBodyValidation.middleware.js";
import { signUpBodyValidation } from "../middlewares/signUpBodyValidation.middleware.js";
import { rootSignInBodyValidation } from "../middlewares/rootSignInBodyValidation.middleware.js";

const router = Router();

router.post("/sign-in", signInBodyValidation, signIn);
router.post("/sign-up", signUpBodyValidation, signUp);
router.post("/rootauth", rootSignInBodyValidation, rootSignIn);

export default router;