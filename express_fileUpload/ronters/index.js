var path = require("path");
var express = require("express");
var router = express.Router();

router.get('/',function (req,res) {
    res.send("OK");

});

router.get("/user",function (req,res) {
    res.send("index user page"+req.url);
});

router.get("/admin",function(req,res){
    res.send("admin page" + req.url);
});

router.get("/redirect",function(req,res){
    res.redirect("https://www.baidu.com");
});

router.get("/upload",function (req,res) {
    console.log(path.join(__dirname+"/../upload.html"));
    res.sendFile(path.join(__dirname+"/../upload.html"));
});
module.exports=router;