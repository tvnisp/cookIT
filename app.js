var express = require("express"),
    app     = express(),
    port    = 3000,
    landing = require("./routes/landing"),
    recipes = require("./routes/recipes"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override")


// mongoose.connect('mongodb://localhost:27017/cook_it', {useNewUrlParser: true});

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://tvnisp:tornados512@cookit-zwdsp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



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