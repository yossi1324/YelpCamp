//all middleware functions:
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middlewareObj={};

middlewareObj.checkCampgroundOwnership = function (req,res,next){
     if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err,foundCampground){
            if(err || !foundCampground){
                req.flash("error" , "Campground not found.");
                res.redirect("/campgrounds");
            }else{
                //does the user own the post ?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                      req.flash("error", "You don't have permission do that.");
                      res.redirect("back");
                }     
            } 
        });
     }else{ //if not, redirect
         req.flash("error", "You need to be the post owner to do that.");
         res.redirect("back");
     }   
};

middlewareObj.checkCommentOwnership = function (req,res,next) {
     if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err,foundComment){
            if(err || !foundComment){
                req.flash("error" , "comment not found.");
                res.redirect("back");
            }else{
                //does the user own the comment ?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                     req.flash("error", "You don't have permission do that.");
                     res.redirect("back");
                }     
            }
        });
     }else{ //if not, redirect
         req.flash("error", "You need to be the comment owner to do that.");
         res.redirect("back");
     }   
};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
}

module.exports=middlewareObj;