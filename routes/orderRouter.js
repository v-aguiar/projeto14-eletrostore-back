import { Router } from "express";

import validToken from "./../middlewares/validToken.js";

const orderRouter = express();

orderRouter.post("/orders", validToken);

export default orderRouter;
