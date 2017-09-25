const express = require('express');
//const router = require('./router');
const mongoose = require('mongoose');
const app = express();

app.use("/api",require("./router"));




mongoose.connect("mongodb://localhost:9888",(error)=>{
    if(error){
        console.log("连接数据库失败");
        console.log(error);
    }else{
        console.log("连接数据库成功");
        //开启服务器
        app.listen(6666,(error)=>{
            if(error){
                console.log("服务器启动失败");
                console.log(error);
            }else{
                console.log("服务器启动成功");
            }
        });
    }
});