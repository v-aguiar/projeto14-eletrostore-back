import { Router } from "express";

import validToken from "./../middlewares/validToken.js";
import validOrderBody from "../middlewares/validOrdersBody.js";
import { postOrder } from "../controllers/orderController.js";
import checkProductAmount from "../middlewares/checkProductAmount.js";

const orderRouter = Router();

orderRouter.post(
  "/orders",
  validToken,
  validOrderBody,
  checkProductAmount,
  postOrder
);

export default orderRouter;
