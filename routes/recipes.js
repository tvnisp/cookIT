var express = require("express"),
    router = express.Router(),
    Recipe = require("../models/recipe")

router.get("/", function(req, res){
    Recipe.find({}, function(err, allRecipes){
        if(err){
            console.log(err);
        } else {
            res.render("./recipes/index", {recipes: allRecipes});
        }
    })
});

router.get("/new", function(req, res){
    res.render("./recipes/new");
})

router.post("/", function(req, res){
    Recipe.create(req.body.recipe, function(err, newCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/recipes")
        }
    });
})

router.get("/:id", function(req, res){
    Recipe.findById(req.params.id, function(err, foundRecipe){
        if(err){
            console.log(err);
        } else {
            res.render("./recipes/show", {recipe: foundRecipe});
        }
    });
});

router.get("/:id/edit", function(req, res){
    Recipe.findById(req.params.id, function(err, updateRecipe){
        if(err){
            console.log(err);
        } else {
            res.render("./recipes/edit", {recipe: updateRecipe})
        }
    });
});

router.put("/:id", function(req, res){
    Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function(err, updateRecipe){
        if(err){
            console.log(err);
        } else {
            res.redirect("/recipes/" + req.params.id)
        }
    });
});

router.delete("/:id", function(req, res){
    Recipe.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/recipes")
        }
    })
});

module.exports = router;