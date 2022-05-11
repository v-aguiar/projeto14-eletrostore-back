import Joi from "joi";

const sign_in_schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default sign_in_schema;
