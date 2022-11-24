import { Router } from "express";
import { signInBodyValidation } from "../middlewares/signInBodyValidation.middleware.js";
import { signUpBodyValidation } from "../middlewares/signUpBodyValidation.middleware.js";
import { signIn, signUp, rootSignIn, rootSignUp } from "../controllers/auth.controllers.js";
import { rootSignInBodyValidation } from "../middlewares/rootSignInBodyValidation.middleware.js";
import { rootSignUpBodyValidation } from "../middlewares/rootSignUpBodyValidation.middleware.js";

const router = Router();

router.post("/sign-in", signInBodyValidation, signIn);
router.post("/sign-up", signUpBodyValidation, signUp);
router.post("/root-sign-in", rootSignInBodyValidation, rootSignIn);
router.post("/root-sign-up", rootSignUpBodyValidation, rootSignUp);

export default router;
