const Joi = require('Joi');

exports.postBodySchema = Joi.object({
    text: Joi.string()
        .max(100)
        .required(),
    authorId: Joi.string()
        .optional()
});