import order_schema from "../schemas/order_schema.js";

export default async function validOrderBody(req, res, next) {
  try {
    const bodyValidation = await order_schema.validateAsync(req.body, {
      abortEarly: false,
    });

    res.locals.body = bodyValidation;
  } catch (error) {
    console.log(error);
    return res.status(422).send(error.message);
  }

  next();
}
