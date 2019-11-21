// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 202,
        message: 'API is working.'
    });
});

// Export API routes
module.exports = router;