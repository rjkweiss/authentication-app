// configure express Router
// basis for the REST API for the entire application
const router = require('express').Router();

// sample test for the routes
router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

// export router so it accessible to necessary files that rely on it
module.exports = router;
