const winston = require('winston');
require('winston-mongodb');
const config = require('config')



module.exports = function(){

    process.on('unhandledRejection', (err)=>{
        throw err
    });

    winston.add(new winston.transports.File({filename:  'errorLog.log' }));
    winston.add(new winston.transports.MongoDB({db: config.get('app.db_url')}));
    winston.add(new winston.transports.Console({colorize:true, prettyPrint: true}));

    winston.exceptions.handle(new winston.transports.File({filename:  'errorLog.log'}));
    winston.exceptions.handle(new winston.transports.Console({colorize: true, prettyPrint: true}));
};


