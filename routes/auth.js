var express = require("express"),
    router = express.Router(),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("../models/user"),
    passportLocalMongoose = require("passport-local-mongoose")

// Register Page
router.get("/register", function(req, res){
    res.render("./auth/register");
});

// Post request for register
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render("./auth/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/recipes");
        })
    })
});

// Login Page 
router.get("/login", function(req, res){
    res.render("./auth/login");
});

// Post login request
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/recipes",
        failureRedirect: "/login"
    }), function(req, res){      
});

// Logout 
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;