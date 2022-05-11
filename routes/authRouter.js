import { Router } from "express";

import { registerUser } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sign-up", registerUser);

export default authRouter;
