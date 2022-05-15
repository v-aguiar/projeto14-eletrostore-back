import db from "../db/db.js";
import { ObjectId } from "mongodb";

export default async function checkProductAmount(req, res, next) {
  try {
    const { products } = res.locals.body;

    let amountMessage = "";

    for (const product of products) {
      const productDB = await db
        .collection("products")
        .findOne({ _id: new ObjectId(product.productId) });

      if (!productDB) {
        amountMessage = "We doesn't have this item in stock anymore!";
        break;
      }

      if (productDB.amount < product.quantity) {
        amountMessage = `There isn't enough ${product.name} for this purchase, we only have ${productDB.amount}`;
        break;
      }
    }

    if (amountMessage) {
      return res.status(401).send(amountMessage);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

  next();
}
