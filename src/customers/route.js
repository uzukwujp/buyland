const { Router} = require('express');
const {signUp, signIn, logOut } = require('./controller');
const { auth} = require('../middlewares/auth');

const customerRouter = Router();

customerRouter
.route('/signup')
.post(signUp);

customerRouter
.route('/signin')
.post(signIn)

customerRouter
.route('/logout')
.post(auth, logOut);

exports.customerRouter = customerRouter;