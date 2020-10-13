const winston = require('winston');

exports.error = (err, req, res) => {
    winston.log("info" , err.message, err);
    res.status(500).json({message: 'oops! something happened'});
};