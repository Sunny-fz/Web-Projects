# Web-Projects
## express初学之搭建简单web框架并实现文件上传
### 这是一个适合刚学node和express练手的一个demo，对web框架有一个初步的认识。
1.创建目录web,并通过npm导入需要的模块或插件(下面用到的)

2.编写package.json(模块管理文件，描述模块信息)

    {  
      "name": "web",  
      "version": "1.0.0",  
      "description": "first web app",  
      "main": "app.js",  
      "author": "",  
      "license": "ISC",  
      "dependencies": {  
      "body-parser": "^1.17.2",  
      "cookie-parser": "^1.4.3",  
      "express": "^4.15.3",  
      "moment": "^2.18.1",  
      "morgan": "^1.8.2",  
      "multer": "^1.3.0",  
      "serve-favicon": "^2.4.3"  
      }  
    }  

3.初始化依赖

    npm init  

4.建立目录结构
    
    --web  
      --public  
         --css  
         --js  
         --img  
       --routes(存放路由文件)  
       --views(存放视图文件)  
       app.js(模块入口文件)  
       package.json(模块描述文件)  


5.编写入口文件app.js

    var path = require("path");  
    var favicon = require("serve-favicon");  
    var logger = require("morgan");  
    var cookieParser = require("cookie-parser");  
    var bodyParser = require('body-parser');  
  
    var express = require("express");  
    var app = express();  
  
    //set app variable  
    app.set('port',process.env.PORT || 7000);  
  
    app.set("views",path.join(__dirname,"views"));  
    app.set("view engine","jade");  
  
    //use middleware function  
    app.use(favicon(__dirname+"/public/favicon.ico"));  
    app.use(logger("dev"));  
    app.use(bodyParser.json());  
    app.use(bodyParser.urlencoded({extended: false}));  
    app.use(cookieParser());  
    app.use(express.static(__dirname + "/public"));  
  
    app.use("/", require("./routes/index.js"));  
    app.use("/user",require("./routes/user.js"));  
    app.use("/system",require("./routes/system.js"));  
  
    //catch 404 and forward to error handler  
    app.use(function(req, res, next) {  
     var err = new Error('Not Found');  
     err.status = 404;  
     next(err);  
    });  
  
    // error handlers  
  
    // development error handler  
    // will print stacktrace  
    if (app.get('env') === 'development') {  
     app.use(function(err, req, res, next) {  
       res.status(err.status || 500);  
       res.render('error', {  
       message: err.message,  
        error: err  
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
    console.log("listen on port:" + app.get('port'));  
    
    module.exports = app;  


6.编写路由文件index.js

    var path = require("path");  
    var express = require("express");  
    var router = express.Router();  
  
    router.get("/",function(req,res){  
       //res.sendFile(path.join(__dirname,"upload.html"));  
        res.send("OK");  
    });  
  
    router.get("/user",function(req,res){  
        res.send("index user page" + req.url);  
    });  
  
    router.get("/admin",function(req,res){  
        res.send("admin page" + req.url);  
    });  
  
    router.get("/redirect",function(req,res){  
       res.redirect("https://www.baidu.com");  
    });  
  
    router.get("/upload",function(req,res){  
     // res.send(path.join(__dirname,"../upload.html"));  
      console.log(path.join(__dirname+"/../upload.html"));  
      // res.sendFile(path.join(__dirname,"../upload.html"));  
     res.sendFile(path.join(__dirname+"/../upload.html"));  
    });  
    module.exports = router;  

7.编写路由文件user.js

    var express = require("express");  
  
    var router = express.Router();  
  
    router.get("/add",function(req,res){  
            res.send("add user page" + req.url);  
       });  
  
    router.get("/delete",function(req,res){  
        res.send("delete user page" + req.url);  
    });  
  
    router.get("/listuser",function(req,res){  
       res.send("listuser page" + req.url);  
    });  
  
    module.exports = router;  

8.编写路由文件system.js(用于写一些接口，如文件上传)

    var path = require("path");  
    var moment = require("moment");  
    var express = require("express");  
    var multer  = require('multer');  
  
    var storage = multer.diskStorage({  
     destination: function (req, file, cb) {  
        cb(null, path.join(__dirname,"/../uploads"));  
     },  
     filename: function (req, file, cb) {  
       var date = new Date();  
       cb(null, "("+moment().format("YYYY-MM-DD")+")"+file.originalname);  
     }  
    });  
  
    var upload = multer({ storage: storage })  
  
    var router = express.Router();  
  
    router.post('/upload', upload.single('avatar'), function (req, res, next) {  
        res.send('文件上传成功')  
        console.log(req.file);  
       console.log(req.body);  
    });  
  
    module.exports = router;  

9.在views文件夹下添加error.jade

不加可能会报错，因为你加了模板引擎，会默认要求你添加一个显示错误的页面，内容为空就好了，不需要编写


10.在web根目录下添加一个静态页面，用于上传文件的页面

upload.html(在index.js这个路由文件中访问/upload时就是返回的这张页面)

    <!DOCTYPE html>  
    <html lang="en">  
    <head>  
       <meta charset="UTF-8">  
       <title>upload</title>  
    </head>  
    <body>  
       <form id='editfile' method='post' action='/system/upload' enctype='multipart/form-data'>  
        <input name="text" type="text"/>  
        选择图片：<input name="avatar" id='upfile' type='file'/>  
        <input type='submit' value='提交'/>  
    </form>  
    </body>  
    </html>  

11.启动服务器

    node app.js  

12.在浏览器中输入127.0.0.1:7000/upload进入上传页面,上传一个文件
![](https://img-blog.csdn.net/20170608003624853?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvQ0ZyaWVtYW4=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

13.特别注意事项！！！！

upload.html表单里的文件控件的name属性avatar必须和system.js里面upload.single("avatar")一致，具体取什么值无所谓，但必须一致！！才能获取对应name的文件。

