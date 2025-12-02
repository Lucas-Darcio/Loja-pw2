import Joi from "joi";

const productSchema = Joi.object().keys({
    name: Joi.string().min(3).max(50).required().messages({
        "string.min": "Nome precisa ter mais do que 3 caracteres"
    }),
    price: Joi.number().min(0).required(),
    description: Joi.string().min(3).max(500).required().messages({
        'string.min':"Descrição precisa ter mais de 3 caracteres"
    }),
    stock: Joi.number().integer().min(0).required()
})

export default productSchema;