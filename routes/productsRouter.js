import { Router } from "express";

import { addProducts } from "../controllers/productsController.js";

const productsRouter = Router();

productsRouter.post("/products", addProducts);

export default productsRouter;
