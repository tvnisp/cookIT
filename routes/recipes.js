var express     = require("express"),
    router      = express.Router(),
    Recipe      = require("../models/recipe"),
    middleware  = require("../middleware")

router.get("/", function(req, res){
    Recipe.find({}, function(err, allRecipes){
        if(err){
            console.log(err);
        } else {
            res.render("./recipes/index", {recipes: allRecipes, currentUser: req.user});
        }
    })
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("./recipes/new");
})

router.post("/", middleware.isLoggedIn, function(req, res){
    Recipe.create(req.body.recipe, function(err, newCreated){
        if(err){
            console.log(err);
        } else {
            newCreated.author.id = req.user._id;
            newCreated.author.username = req.user.username;
            newCreated.save();
            res.redirect("/recipes")
        }
    });
})

router.get("/:id", function(req, res){
    Recipe.findById(req.params.id).populate("comments").exec(function(err, foundRecipe){
        if(err){
            console.log(err);
        } else {
            res.render("./recipes/show", {recipe: foundRecipe});
        }
    });
});

router.get("/:id/edit", middleware.checkRecipeOwnership, function(req, res){
    Recipe.findById(req.params.id, function(err, updateRecipe){
        if(err){
            console.log(err);
        } else {
            res.render("./recipes/edit", {recipe: updateRecipe})
        }
    });
});

router.put("/:id", middleware.checkRecipeOwnership, function(req, res){
    Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function(err, updateRecipe){
        if(err){
            console.log(err);
        } else {
            res.redirect("/recipes/" + req.params.id)
        }
    });
});

router.delete("/:id", middleware.checkRecipeOwnership, function(req, res){
    Recipe.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/recipes")
        }
    })
});

module.exports = router;