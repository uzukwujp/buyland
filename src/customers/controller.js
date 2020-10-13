const Customer = require('./model');
const {signUpValidation} = require('./inputValidations/signup');
const {signInValidation} = require('./inputValidations/signin');
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
};

exports.signIn = async (req, res) => {
    const { error} = signInValidation(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});

    const customer = await Customer.findOne({email: req.body.email});

    if(!customer)return res.status(400).json({message: 'Invalid email or password'});

    const validPassword = await bcrypt.compare(req.body.password, customer.password);

    if(!validPassword) return res.status(400).json({message: 'Invalid email or password'});

    const token = await customer.generateToken();
    res.status(200).json({token, customer});
};