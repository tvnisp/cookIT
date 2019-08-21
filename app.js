var express         = require("express"),
    app             = express(),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    Recipe          = require("./models/recipe"),
    Comment         = require("./models/comment"),
    flash           = require("connect-flash")

// Routes
var indexRoutes     = require("./routes/landing"),
    recipesRoutes   = require("./routes/recipes"),
    commentsRoutes  = require("./routes/comments"),
    authRoutes      = require("./routes/auth")
console.log()

mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true});

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

// Set the app
app.use(flash());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

// current User 
app.use(function(req, res, next){
    res.locals.currentUser  = req.user;
    res.locals.error        = req.flash("error");
    res.locals.success      = req.flash("success");
    next();
})

// Routes USE
app.use("/", indexRoutes)
app.use("/recipes", recipesRoutes)
app.use("/recipes/:id/comments", commentsRoutes)
app.use(authRoutes)


// Listen and serve
app.listen(process.env.PORT || 5000, function(){
    console.log("The CookIT is running")
})