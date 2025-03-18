const express = require('express');

// configure an express router
const router = express.Router();

// import the REST API routes
const apiRouter = require('./api');

router.use('/api', apiRouter);

// static routes
// serve react build files in production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');

    // serve static assets in frontend's build
    router.use(express.static(path.resolve(__dirname, '../../frontend/dist')));

    // serve any other paths that do not start with 'api'
    router.get(/^(?!\/?api).*/, (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, '../../frontend/dist', 'index.html')
        );
    });

    // serve front end files
    router.get('/', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.sendFile(
            path.resolve(__dirname, '../../frontend/dist', 'index.html')
        );
    });

}

// allow CSRF token cookie, XSRF-TOKEN to be reset in development environment only
if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', (req, res) => {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        return res.json({});
    });
}

// export router so it can be used in the express application
module.exports = router;
