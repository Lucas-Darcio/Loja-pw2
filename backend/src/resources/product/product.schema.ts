import Joi from "joi";

const productSchema = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().min(0).max(100).required(),
    stock: Joi.number().integer().min(0).required()
})

export default productSchema;