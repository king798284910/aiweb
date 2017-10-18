const express = require('express');
const mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');

var session = require('express-session');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(session({
    secret: 'aiweb',
    name: 'aiweb',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 60*60*1000},  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));

//为vue开启简洁路由模式
app.use(require('connect-history-api-fallback')());
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));

app.use("/api",require("./router"));
app.use("/images",express.static(__dirname+"/images"));
app.use(express.static(__dirname+'/static'));

mongoose.connect("mongodb://localhost:9888/aiweb",(error)=>{
    if(error){
        console.log("连接数据库失败");
        console.log(error);
    }else{
        console.log("连接数据库成功");
        //开启服务器
        app.listen(8686,(error)=>{
            if(error){
                console.log("服务器启动失败");
                console.log(error);
            }else{
                console.log("服务器启动成功");
            }
        });
    }
});