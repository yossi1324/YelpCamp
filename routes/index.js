var express= require("express");
var router =express.Router();
var passport=require("passport");
var User=require("../models/user");
var middleware=require("../middleware/index.js");

//Root route
router.get("/", function(req, res){
    res.render("landing");
});



//Register forn route
router.get("/register",function(req, res) {
    res.render("register");
});



//show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//handling login logic
router.post("/login",passport.authenticate("local",{
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }) ,function(req, res) {
     res.flash("success", "Successfully logged in.");
});

//handling register logic
router.post("/register", function(req, res) {
    var newUser = new User({username:req.body.username});
    User.register(newUser , req.body.password,function(err,user){
         if(err){
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req,res,function(){
             req.flash("success", "Wellcome to YelpCamp "+user.username+".");
            res.redirect("/campgrounds");
        })
        
    })
});

//logout route
router.get("/logout", function(req, res) {
    req.flash("success", "Successfully logged out.");
    req.logout();
    res.redirect("/campgrounds");
})



module.exports=router;