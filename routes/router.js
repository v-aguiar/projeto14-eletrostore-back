import { Router } from "express";

import productsRouter from "./productsRouter.js";
import authRouter from "./authRouter.js";
import orderRouter from "./orderRouter.js";

const router = Router();

router.use(productsRouter);
router.use(authRouter);
router.use(orderRouter);

export default router;
