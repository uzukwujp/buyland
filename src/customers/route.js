const { Router} = require('express');
const{signUp} = require('./controller');

const customerRouter = Router();

customerRouter
.route('/signup')
.post(signUp);

exports.customerRouter = customerRouter;