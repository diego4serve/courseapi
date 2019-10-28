const Joi = require('joi');

const coursesSchema = Joi.object({
    name: Joi.string().required(),
    schedule: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
});

module.exports = coursesSchema