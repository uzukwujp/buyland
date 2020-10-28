require('express-async-errors');
require('dotenv').config();
const App = require('./startUp/app');
const Db = require('./startUp/db');
const winstonConfiguration = require('./startUp/winston_config');


console.log(process.env.NODE_ENV);


winstonConfiguration();

const main = async () => {
    try {
        await Db.connection();
        new App();
    } catch (err) {
        throw err
    }
};

main()