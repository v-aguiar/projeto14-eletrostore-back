import { Router } from "express";

import productsRouter from "./productsRouter.js";

const router = Router();

router.use(productsRouter);

export default router;
