const Joi = require('joi');

exports.userSchema = Joi.object({
    name:   Joi.string()
        .min(2)
        .max(30)
        .required(),
    email: Joi.string().email().required()
});