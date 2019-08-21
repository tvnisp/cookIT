var Recipe  = require("../models/recipe"),
    Comment = require("../models/comment");

// All the middleware goes here

var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, updateComment){
            if(err){
                res.redirect("back");
            } else {
                if(updateComment.author.id.equals(req.user._id) || req.user.username == "tvnisp"){
                    next();
                } else {
                    res.redirect("back")
                }
            }
        });
    } else {
        req.flash("error", "You don't have permission to do that!");
        res.redirect("back")
    }
}

middlewareObj.checkRecipeOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Recipe.findById(req.params.id, function(err, updateRecipe){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if(updateRecipe.author.id.equals(req.user._id) || req.user.username == "tvnisp"){
                    next();
                } else {
                    res.redirect("back")
                }
            }
        });
    } else {
        req.flash("error", "You are not the Recipe Owner");
        res.redirect("back")
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    req.flash("error", "Please Login First!");
    res.redirect("/login");
}

module.exports = middlewareObj