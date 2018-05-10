var express=require("express");

var router=express.Router();

router.get("/add",function (req,res) {
    res.send("add user page"+req.url);

});

router.get("/delete",function (req,res) {
    res.send("delete user page" + req.url);
});
router.get("/listuser",function(req,res){
    res.send("listuser page" + req.url);
});

module.exports = router;