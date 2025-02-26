// hold resources for the route paths beginning with /api/users

const express = require('express');
const router = express.Router();

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

// sign up a user
router.post('/', async(req, res, next) => {
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
