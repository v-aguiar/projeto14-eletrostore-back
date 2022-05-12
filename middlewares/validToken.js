import db from "./../db/db/js";

import token_schema from "../schemas/token_schema";
import { response } from "express";

export default async function validToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "").trim();
  const tokenValidation = token_schema.validate(token);

  if (tokenValidation.error) {
    return response.status(422).send("⚠ Invalid Token");
  }

  try {
    const session = await db
      .collection("sessions")
      .findOne({ token: tokenValidation.value });

    if (!session) {
      return res.sendStatus(401);
    }

    const user = await db.collection("users").findOne({ _id: session.userId });

    if (!user) {
      return res.status(401).send("⚠ There isn't an user for this token!");
    }

    res.locals.user = user;
  } catch (error) {
    return res.sendStatus(500);
  }
}
