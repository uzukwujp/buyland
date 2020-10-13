const { Router} = require('express');
const {signUp, signIn } = require('./controller');

const customerRouter = Router();

customerRouter
.route('/signup')
.post(signUp);

customerRouter
.route('/signin')
.post(signIn)

exports.customerRouter = customerRouter;