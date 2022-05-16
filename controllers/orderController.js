import { ObjectId } from "mongodb";
import dayjs from "dayjs";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

import db from "../db/db.js";

dotenv.config();

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

    const { insertedId } = await db.collection("orders").insertOne({
      address,
      products,
      payment,
      userId: user._id,
      email: user.email,
      date: dayjs().format("DD/MM - HH:mm"),
    });

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: user.email, // Change to your recipient
      from: "icaro.pavani@hotmail.com", // Change to your verified sender
      subject: `Pedido Realizado na EltroStore`,
      text: `
      Seu pedido de tag nr ${insertedId.toString()} foi confirmado na Eletro Store.
      


      Agradecemos pela escolha. Atenciosamente,
      
      Eletro Store`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getOrders(req, res) {
  try {
    const { user } = res.locals;
    const orders = await db
      .collection("orders")
      .find({ userId: user._id })
      .toArray();
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
