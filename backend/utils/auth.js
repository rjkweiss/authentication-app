
// import jwt package and configure it
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');

// import user model
const { User } = require('../db/models');

// destructure the jwt config object
const { secret, expiresIn } = jwtConfig;

// function to set a JWT cookie after a user is logged in or signed up
const setTokenCookie = async(res, user) => {

    // create the token
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) }
    );

    // check the environment
    const isProduction = process.env.NODE_ENV === 'production';

    // set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000,
        secure: isProduction,
        sameSite: isProduction && 'Lax',
        httpOnly: true
    });

    // return the token that was set
    return token;
};

// function to restore the session based on the contents of the JWT cookie
const restoreUser = (req, res, next) => {

    // get the token parsed from cookies
    const { token } = req.cookies;

    // verify the token, if valid, find the user in the database, otherwise
    // error handler
    return jwt.verify(token, secret, null, async(err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (err) {
            res.clearCookie('token');
            return next();
        }

        // if no user was found, clear the token cookies from response
        if (!req.user) res.clearCookie('token');

        // otherwise, proceed to next middleware
        return next();
    });
};

// middleware to authenticate session user before accessing a route
const requireAuth = [restoreUser,
    function (req, _res, next) {

        // if a session user is present, go to next middleware
        if (req.user) return next();

        // create an error if no session user and pass it to error handler
        const err = new Error('Unathorized');
        err.title = 'Unathorized';
        err.errors = ['Unathorized'];
        err.status = 401;
        return next(err);
    }
];

module.exports = { setTokenCookie, restoreUser, requireAuth };
