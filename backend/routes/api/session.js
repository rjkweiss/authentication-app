// holds the resources for the route paths beginning with /api/session

const express = require('express');
const router = express.Router();

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

// post method to login a user
router.post('/', async(req, res, next) => {

    // get login credentials from the request body
    const { credential, password } = req.body;

    // find a user with this credentials using the User model's instance method, login
    // if credentials are valid, the user should be logged in and its data returned using
    // the 'currentUser' scope
    const user = await User.login({ credential, password });

    // handle log in fail
    if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials are invalid'];
        return next(err);
    }

    // set the token for the user
    await setTokenCookie(res, user);

    // return user info
    return res.json({ user });
});

// export router so it can be used elsewhere
module.exports = router;
