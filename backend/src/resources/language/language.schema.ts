import Joi from "joi";
import { LanguageTypes } from "./language.constants";

const languagesSchema = Joi.object().keys({
    lang: Joi.string().valid(...Object.values(LanguageTypes)), 
})

export default languagesSchema;