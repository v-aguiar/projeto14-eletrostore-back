import { Router } from "express";

import validToken from "./../middlewares/validToken.js";
import validOrderBody from "../middlewares/validOrdersBody.js";
import { postOrder, getOrders } from "../controllers/orderController.js";
import checkProductAmount from "../middlewares/checkProductAmount.js";

const orderRouter = Router();

orderRouter.post(
  "/orders",
  validToken,
  validOrderBody,
  checkProductAmount,
  postOrder
);

orderRouter.get("/orders", validToken, getOrders);

export default orderRouter;
