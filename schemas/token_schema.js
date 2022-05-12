import Joi from "joi";

const token_schema = Joi.string().required();

export default token_schema;
