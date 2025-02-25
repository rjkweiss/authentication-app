
// configure an express router
const express = require('express');
const router = express.Router();

// import the REST API routes
const apiRouter = require('./api');
router.use('/api', apiRouter);

// allow CSRF token cookie, XSRF-TOKEN to be reset
router.get('/api/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie('XSRF-TOKEN', csrfToken);
    res.status(200).json({
        'XSRF-TOKEN': csrfToken
    });
});

// export router so it can be used in the express application
module.exports = router;
