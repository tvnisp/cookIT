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

router.get("/:id/comments/:comment_id/edit", checkCommentOwnership, function(req, res){
    Recipe.findById(req.params.id, function(err, foundRecipe){
        if(err){
            console.log(err);
        } else {
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    console.log(err);
                } else {
                    res.render("./comments/edit", {recipe: foundRecipe, comment: foundComment})
                }
            });
        }
    });
});

router.put("/:id/comments/:comment_id", checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
        } else {
            res.redirect("/recipes/" + req.params.id);
        }
    })
});

router.delete("/:id/comments/:comment_id", checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, deleted){
        if(err){
            console.log(err);
        } else {
            res.redirect("/recipes/" + req.params.id)
        }
    })
})

function checkCommentOwnership(req, res, next){
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


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;