// hold resources for the route paths beginning with /api/users

const express = require('express');
const router = express.Router();

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

// modules to validate signup
const { check } = require('express-validator');
const { handleValidationErrors }  = require('../../utils/validation');

// signup validation middleware
const validateSignup = [
    // check email
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email'),

    // check username
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please Provide a username with at least 4 characters'),

    // ensure username is not email
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email'),

    // check password
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Please provide a password with 6 characters or more'),

    // handle validation errors
    handleValidationErrors
]

// sign up a user
router.post('/', validateSignup, async(req, res, next) => {
    // get user credentials (username, password, email)
    const { username, email, password } = req.body;

    // sign up the user using the signup instance method on the User model
    const user = await User.signup({ username, email, password});

    // set the csrf token for user
    await setTokenCookie(res, user);

    // return the information of the newly created user using 'currentUser' scope in User model
    return res.json({ user });
});

// export file to be used elsewhere
module.exports = router;
