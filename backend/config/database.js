const config = require('./index');

const db = config.db;

const { username, password, database, host } = db

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
    logQueryParameters: true,
    typeValidation: true
  },
  production: {
    use_env_variables: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
