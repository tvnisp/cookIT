var express         = require("express"),
    app             = express(),
    port            = process.env.PORT || 5000,
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    Recipe          = require("./models/recipe"),
    Comment         = require("./models/comment")

// Routes
var indexRoutes     = require("./routes/landing"),
    recipesRoutes   = require("./routes/recipes"),
    commentsRoutes  = require("./routes/comments"),
    authRoutes      = require("./routes/auth")

// mongoose.connect('mongodb://localhost:27017/cook_it', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://tvnisp:tornados512@cookit-zwdsp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true});

// Passport Configuration
app.use(require("express-session")({
    secret: "Frida is the best dog",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// current User 
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

// Set the app
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

// Routes USE
app.use("/", indexRoutes)
app.use("/recipes", recipesRoutes)
app.use("/recipes/:id/comments", commentsRoutes)
app.use(authRoutes)


// Listen and serve
app.listen(port, function(){
    console.log("The CookIT is running at the port: " + port)
})