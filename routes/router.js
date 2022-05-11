import { Router } from "express";

import productsRouter from "./productsRouter.js";
import authRouter from "./authRouter.js";

const router = Router();

router.use(productsRouter);
router.use(authRouter);

export default router;
