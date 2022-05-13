import { ObjectId } from "mongodb";
import chalk from "chalk";

import db from "../db/db.js";
import products_schema from "../schemas/products_schema.js";

// Add an array of products on the Database
export async function addProducts(req, res) {
  const products = req.body;

  if (!products) {
    products.forEach((product) => {
      const validateProducts = products_schema.validate(product);
      if (validateProducts.error) {
        console.error(
          chalk.bold.redBright(
            "⚠ Invalid products data: ",
            validateProducts.error.message
          )
        );
        res.status(422).send("⚠ Invalid data! Couldn't add product...");
        return;
      }
    });
  }

  try {
    await db.collection("products").insertMany(products);
    res.status(201).send("Ok!");
  } catch (e) {
    console.error("⚠ Error adding products on db: ", e);
    res.status(422).send("⚠ Couldn't add products on database...");
  }
}

export async function getProducts(req, res) {
  try {
    const { category } = req.query;
    console.log(category);
    let products = [];
    if (!category) {
      products = await db.collection("products").find().toArray();
    } else {
      products = await db
        .collection("products")
        .find({ categories: category })
        .toArray();
    }
    res.status(200).send(products);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function getProduct(req, res) {
  const { productId } = req.params;

  try {
    const product = await db
      .collection("products")
      .findOne({ _id: ObjectId(productId) });

    delete product._id;

    res.send(product);
  } catch (e) {
    console.error("⚠ Couldn`t fetch product!");
    res.sendStatus(422);
  }
}
