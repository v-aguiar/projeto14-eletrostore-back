import Joi from "joi";

const order_schema = Joi.object({
  address: Joi.object({
    bairro: Joi.string().required(),
    cep: Joi.string().required(),
    complemento: Joi.string(),
    localidade: Joi.string().required(),
    logradouro: Joi.string().required(),
    numero: Joi.string().required(),
    uf: Joi.string().required(),
  }),
  payment: Joi.string().required(),
  products: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        price: Joi.string().required(),
        quantity: Joi.number().integer().required(),
        productId: Joi.string().required(),
        image: Joi.object({
          src: Joi.string().uri().required(),
          alt: Joi.string().required(),
        }),
      })
    )
    .required(),
});

export default order_schema;
