const config = require('config');
const jwt = require('jsonwebtoken');
const Customer = require('../customers/model');


exports.auth = async (req,res, next) => {
    if(!req.header('Authorization'))return res.status(400).json({message: 'Access denied, no token provided'});

    const token = req.header('Authorization').split(' ')[1];

    const validToken = await jwt.verify(token, config.get('jwt_secret'));

    const customer = await Customer.findOne({_id: validToken._id, 'tokens.token': token});

    if(!customer)return res.status(401).json({message: 'Access denied, Invalid token provided'});

    req.customer = customer;
    req.token = token;
    next()
};