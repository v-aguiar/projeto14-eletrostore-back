import { Router } from "express";

import { addProducts } from "../controllers/productsController.js";
import { getProducts } from "../controllers/productsController.js";
import validToken from "../middlewares/validToken.js";

const productsRouter = Router();

productsRouter.post("/products", addProducts);

productsRouter.get("/products", validToken, getProducts);

export default productsRouter;
