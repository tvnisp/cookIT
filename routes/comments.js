var express = require("express"),
    router = express.Router(),
    Recipe = require("../models/recipe"),
    Comment = require("../models/comment")

router.get("/:id/comments/new", isLoggedIn, function(req, res){
    Recipe.findById(req.params.id, function(err, foundRecipe){
        if(err){
            console.log(err)
        } else {
            res.render("./comments/new", {recipe: foundRecipe})
        }
    })
});

router.post("/:id/comments", isLoggedIn, function(req, res){
    Recipe.findById(req.params.id, function(err, recipe){
        if(err){
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    recipe.comments.push(comment);
                    recipe.save();
                    res.redirect("/recipes/" + recipe._id)
                }
            })
        }
    })
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;