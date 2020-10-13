const Joi = require('joi');

const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
    password: Joi.string().required()
});

exports.signInValidation = (customer) => {
    return schema.validate(customer);
}