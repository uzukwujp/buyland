require('express-async-errors');
const App = require('./startUp/app');
const Db = require('./startUp/db');
const winstonConfiguration = require('./startUp/winston_config');

const config = require('config');


winstonConfiguration();

if (!config.get('app.jwt_secret')) {
    throw new Error('jwt_secret is not defined');
};

const main = async () => {
    try {
        await Db.connection();
        new App();
    } catch (err) {
        throw err
    }
};

main()