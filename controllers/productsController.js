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
