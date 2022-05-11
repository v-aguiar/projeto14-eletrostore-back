import { stripHtml } from "string-strip-html";
import bcrypt from "bcrypt";

import registry_user_schema from "../schemas/registry_user_schema.js";
import db from "../db/db.js";

export async function registerUser(req, res) {
  const { name, email, password, repeat_password } = req.body;
  const userBody = {
    name: stripHtml(name).result.trim(),
    email: stripHtml(email).result.trim(),
    password: stripHtml(password).result.trim(),
    repeat_password: stripHtml(repeat_password).result.trim(),
  };

  try {
    const signUpUserValidation = await registry_user_schema.validateAsync(
      userBody,
      { abortEarly: false }
    );
    const userRegistry = await db
      .collection("users")
      .findOne({ email: signUpUserValidation.email });

    if (userRegistry) {
      return res.status(422).send("⚠ E-mail adress already used...");
    }

    const SALT = 10;
    const passwordHash = bcrypt.hashSync(signUpUserValidation.password, SALT);
    delete signUpUserValidation.repeat_password;
    await db
      .collection("users")
      .insertOne({ ...signUpUserValidation, password: passwordHash });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    if (error.isJoi === true) {
      return res.status(422).send(error.message);
    }
    res.sendStatus(500);
  }
}
