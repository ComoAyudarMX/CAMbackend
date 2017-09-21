const Joi = require("joi");

module.exports.newEventModel = Joi.object().keys({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(255).required(),
    location: Joi.object().keys({
        latitude: Joi.number().optional(),
        longitude: Joi.number().optional()
    }).optional(),
    address: Joi.string().required()
});

module.exports.responseCreateEventModel = function () {
    this.event_id = "";

    return this;
}