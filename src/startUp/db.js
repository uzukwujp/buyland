const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');

class Db {
    constructor(){
        
    }
    static async connection(){
        try{
            await mongoose.connect(config.get('app.db_url'), { useNewUrlParser: true });
            winston.log('info', 'connection to database successful')
        }catch(err){
            throw err;
        }
    }
}

module.exports = Db;