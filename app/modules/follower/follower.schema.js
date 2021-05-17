const Joi = require('Joi');

exports.followerParamsSchema = Joi.object({
    id: Joi.string()
        .required()
});