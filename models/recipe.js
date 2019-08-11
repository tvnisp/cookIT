var mongoose = require("mongoose");

var recipeSchema = new mongoose.Schema (
    {
        name: String,
        author: String,
        image: String,
        body: String,
        date: {type: Date, default: Date.now}
    }
)

module.exports = mongoose.model("Recipe", recipeSchema);