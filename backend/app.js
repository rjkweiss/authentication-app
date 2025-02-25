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

// for sequelize database validation error handling
const { ValidationError } = require('sequelize');

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

// resource not found error-handler
// catches unhandled requests and forward to error handler
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

// sequelize error handler
// catches sequelize errors and formatting them before sending the error response
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error
    if (err instanceof ValidationError) {
        err.errors = err.errors.map( error => error.message);
        err.title = 'Validation error';
    }
    next(err);
});

// middleware to handle formatting all the errors before they are returned as JSON response
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null: err.stack
    });
});

// export application
module.exports = app;
