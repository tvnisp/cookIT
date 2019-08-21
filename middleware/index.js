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
        res.redirect("back")
    }
}

middlewareObj.checkRecipeOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Recipe.findById(req.params.id, function(err, updateRecipe){
            if(err){
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
        res.redirect("back")
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

module.exports = middlewareObj