import Joi from "joi";

const products_schema = Joi.object({
  name: Joi.string().required,
  price: Joi.string().required,
  amount: Joi.number().integer().required,
  images: Joi.array().required,
  categories: Joi.array().required,
  description: Joi.string,
});

export default products_schema;
