const Customer = require('./model');
const {signUpValidation} = require('./inputValidations/signup');
const bcrypt = require('bcrypt');

exports.signUp = async (req, res ) => {
    const {error} = signUpValidation(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    };

    const hash = await bcrypt.hash(req.body.password, 10);

    const customer = await new Customer({
        firstName: req.body.firstName.toLowerCase(),
        lastName: req.body.lastName.toLowerCase(),
        password: hash,
        phoneNumber: Number(req.body.phoneNumber),
        email: req.body.email
    });
    await customer.save();

    const token = await customer.generateToken()

    res.status(201).json({customer, message: 'registration successful', token});

}