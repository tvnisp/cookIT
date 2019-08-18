var mongoose = require("mongoose");

var recipeSchema = new mongoose.Schema (
    {
        name: String,
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        },
        image: String,
        body: String,
        date: {type: Date, default: Date.now},
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
    }
)

module.exports = mongoose.model("Recipe", recipeSchema);