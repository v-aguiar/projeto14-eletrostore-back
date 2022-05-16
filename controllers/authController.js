import { stripHtml } from "string-strip-html";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import registry_user_schema from "../schemas/registry_user_schema.js";
import sign_in_schema from "../schemas/sign_in_schema.js";
import db from "../db/db.js";

dotenv.config();

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

export async function signIn(req, res) {
  const { email, password } = req.body;

  const validateInputs = sign_in_schema.validate({ email, password });
  if (validateInputs.error) {
    console.error(
      "Invalid input data at Joi validation: ",
      validateInputs.error.message
    );
    res.status(401).send("⚠ Invalid input data!");
    return;
  }

  try {
    const registeredUser = await db.collection("users").findOne({ email });
    if (
      registeredUser &&
      bcrypt.compareSync(password, registeredUser.password)
    ) {
      const userId = registeredUser._id;
      const existingSession = await db
        .collection("sessions")
        .findOne({ userId });

      const createdSession = await db.collection("sessions").insertOne({
        userId: registeredUser._id,
        timestamp: Date.now(),
      });

      const secret_key = process.env.JWT_KEY;
      const data = createdSession.insertedId.toString();

      const token = !existingSession
        ? jwt.sign(data, secret_key)
        : existingSession.token;

      res.status(200).send({ token, username: registeredUser.name });
      return;
    } else {
      console.error("⚠ No user registered with same email/password!");
      res.sendStatus(403);
      return;
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}
