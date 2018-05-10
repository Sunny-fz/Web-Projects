/**
 * Created by 冯周 on 2018/5/9.
 */
var path=require("path");
var favicon=require("serve-favicon");
var logger=require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');

var express=require("express");
var app=express();
//set app variable
 app.set('port',process.env.PORT||7000);

 app.set("views",path.join(__dirname,"views"));
 app.set("view engine","jade");

//use middleware function
 app.use(favicon(__dirname+"/public/favicon.ico"));
 app.use(logger("dev"));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:false}));
 app.use(cookieParser());
 app.use(express.static(__dirname+"/public"));

 app.use("/",require("./ronters/index.js"));
 app.use("/use",require("./ronters/use.js"));
 app.use("/system",require("./ronters/system.js"));

//catch 404 and forward to error handler
app.use(function (req,res,next) {
    var err=new Error('Not Found');
    err.status=404;
    next(err);

});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env')==='development'){
    app.use(function (err,req,res,next) {
        res.status(err.status||500);
        res.render('error',{
            message:err.message,
            error:err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(app.get('port'));
console.log("listen on port:"+app.get('port'));
module.exports=app;