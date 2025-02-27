// import environment variables
require('dotenv').config();

const { port } = require('../config');
const app = require('../app');
const db = require('../db/models');

// check database connection before starting the app
db.sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection success! Sequelize is ready to use...');

        // start listening for requests
        app.listen(port, () => {
            console.log(`Listening on port ${port}...`);
        });
    })
    .catch((err) => {
        console.log('Database connection failure.');
        console.log(err);
    });
