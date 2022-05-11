import Joi from "joi";

const registry_user_schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  repeat_password: Joi.ref("password"),
});

export default registry_user_schema;
