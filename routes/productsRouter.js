import { Router } from "express";

import {
  addProducts,
  getProduct,
  getProducts,
} from "../controllers/productsController.js";
import validToken from "../middlewares/validToken.js";

const productsRouter = Router();

productsRouter.post("/products", addProducts);

productsRouter.get("/products", validToken, getProducts);
productsRouter.get("/products/:productId", validToken, getProduct);

export default productsRouter;
