import { Router } from "express";

import { registerUser, signIn } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sign-up", registerUser);
authRouter.post("/sign-in", signIn);

export default authRouter;
