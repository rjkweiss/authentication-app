// import packages
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// import env variables and declare a variable that will help us determine if env is production
const { environment } = require('./config');
const isProduction = environment === 'production';

// initialize app
const app = express();

// connect morgan middleware for logging information about requests and responses
app.use(morgan('dev'));

// middleware to parse cookies
app.use(cookieParser());

// middleware for parsing JSON bodies of requests with Content-Type of "application/json"
app.use(express.json());

// security middlewares depending on environment
// cors allowed on development env only
// helmet, csurf used in both environments
if (!isProduction) {
    app.use(cors());
}

// helmet -- protects against XSS attacks
app.use(helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
}));

// csurf token -- protects against CSRF attacks in production env
// adds _csrf cookie that is HTTP-only readable
// adds req.csrfToken method on all requests that will be set to XSRF-TOKEN cookie
app.use(csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && 'Lax',
        httpOnly: true
    }
}));

// get the routes that are defined in routes folder
const routes = require('./routes');

app.use(routes);

// export application
module.exports = app;
