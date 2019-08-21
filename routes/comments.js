var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Recipe      = require("../models/recipe"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware")

router.get("/new", middleware.isLoggedIn, function(req, res){
    Recipe.findById(req.params.id, function(err, foundRecipe){
        if(err){
            console.log(err)
        } else {
            res.render("./comments/new", {recipe: foundRecipe})
        }
    })
});

router.post("/", middleware.isLoggedIn, function(req, res){
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

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
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

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
        } else {
            res.redirect("/recipes/" + req.params.id);
        }
    })
});

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, deleted){
        if(err){
            console.log(err);
        } else {
            res.redirect("/recipes/" + req.params.id)
        }
    })
})

module.exports = router;