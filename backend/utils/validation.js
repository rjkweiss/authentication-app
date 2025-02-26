// handles validation for routes that expect a body
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
const handleValidationErrors = (req, _res, next) => {

    // get any validation errors
    const validationErrors = validationResult(req);

    // handle case where we have errors in the req body
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map(error => `${error.msg}`);

        const err = Error('Bad request');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request';
        next(err);
    }

    next();
};

module.exports = {
    handleValidationErrors
}
