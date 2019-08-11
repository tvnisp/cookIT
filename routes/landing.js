var express = require("express"),
    router = express.Router();

// Main landing page Router
router.get("/", function(req, res){
    res.render("landing");
});

module.exports = router;