var express = require("express"),
    app     = express(),
    port    = 3000,
    landing = require("./routes/landing"),
    recipes = require("./routes/recipes"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override")


// mongoose.connect('mongodb://localhost:27017/cook_it', {useNewUrlParser: true});

mongoose.connect('mongodb+srv://tvnisp:tornados512@cookit-zwdsp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true});


// Set the app
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

// Routes USE
app.use("/", landing)
app.use("/recipes", recipes)

app.listen(port, function(){
    console.log("The CookIT is running at the port: " + port)
})