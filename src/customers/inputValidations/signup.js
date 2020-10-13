const Joi = require('joi');

const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
});

exports.signUpValidation = (customer) => {
    return schema.validate(customer);
}