const mongoose = require('mongoose');
const winston = require('winston');

class Db {
    constructor(){
        
    }
    static async connection(){
        try{
            if(process.env.NODE_ENV === "production"){
            await mongoose.connect(process.env.prod_mongo_url, { useNewUrlParser: true,  useUnifiedTopology: true });
            winston.log('info', 'connection to database successful')
            }else{
                await mongoose.connect(process.env.dev_mongo_url, {useNewUrlParser: true,  useUnifiedTopology: true});
                winston.log('info', 'connection to database successful')
            }
        }catch(err){
            throw err;
        }
    }
}

module.exports = Db;