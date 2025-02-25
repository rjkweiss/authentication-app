// configure express Router
// basis for the REST API for the entire application
const router = require('express').Router();

// import utils, User model  for setting token
// const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
// const { User } = require('../../db/models');

// test setTokenCookie method for a given user
// router.get('/set-token-cookie', async(_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'demoUser'
//         }
//     });

//     // set token cookie for this user
//     setTokenCookie(res, user);

//     return res.json({ user });
// });

// // test restoreUser
// router.get('/restore-user', restoreUser, (req, res) => {
//     const sessionUser = req.user;
//     return res.json(sessionUser);
// });

// // test requireAuth
// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user);
// });


// sample test for the routes
router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

// export router so it accessible to necessary files that rely on it
module.exports = router;
