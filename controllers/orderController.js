import { ObjectId } from "mongodb";
import dayjs from "dayjs";

import db from "../db/db.js";

export async function postOrder(req, res) {
  try {
    const { user, body } = res.locals;
    const { address, payment, products } = body;

    for (const product of products) {
      const productDB = await db
        .collection("products")
        .findOne({ _id: new ObjectId(product.productId) });

      const newAmount = productDB.amount - product.quantity;

      await db
        .collection("products")
        .updateOne(
          { _id: new ObjectId(product.productId) },
          { $set: { amount: newAmount } }
        );
    }

    await db.collection("orders").insertOne({
      address,
      products,
      payment,
      userId: user._id,
      email: user.email,
      date: dayjs().format("DD/MM - HH:mm"),
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
