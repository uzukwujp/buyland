const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');

const customerSchema = new mongoose.Schema({
    firstName: {type: String, required: true, lowercase: true},
    lastName: {type: String, required: true, lowercase: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    isAdmin: {type: Boolean, default:false},
    tokens: [{token : {type: String, required: true}}]
});

customerSchema.plugin(uniqueValidator);

customerSchema.methods.generateToken =  async function (){
    try{
    customer = this;
    const token =  jwt.sign({_id: customer._id.toString()},process.env.jwt_secret, {expiresIn: '24h'});

    customer.tokens.push({token});
    await customer.save()
    return token

    }catch(err){
        throw err
  }
};

customerSchema.methods.toJSON = function(){
    const customer = this;
    const customerObject = customer.toObject();
    delete customerObject.tokens;
    delete customerObject.password;
    return customerObject;
}

module.exports = mongoose.model("Customer", customerSchema);