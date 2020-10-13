const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { json } = require('body-parser');
const winston = require('winston');
const{customerRouter} = require('../customers/route');

class App {
    app = express()

    constructor(){
        this.app.listen(process.env.PORT || 4200);

        this.setMiddleWare()
    }

    setMiddleWare(){
        this.app.use(helmet());

        this.app.use(cors());

        this.app.use(json());

        this.app.use('/api/customers', customerRouter);

        this.app.use((err, req, res) => {
            winston.log("info" , err.message, err);
            res.status(500).json({message: 'oops! something happened'});
        })
    }
}

module.exports = App;