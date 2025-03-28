require('dotenv').config();

module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,

    // database configurations
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST
    },

    // jwt configurations
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN
    }
};
