
// configure an express router
const express = require('express');
const router = express.Router();

// sample testing route
router.get('/hello-world', (req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.json('Hello World!');
});

// export router so it can be used in the express application
module.exports = router;
