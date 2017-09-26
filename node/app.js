const express = require('express');
const mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/api",require("./router"));




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