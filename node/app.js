const express = require('express');
const mongoose = require('mongoose');
const app = express();

//app.use("/api",require("./router"));
app.get('/',function(req,res){

    console.log(11);
});



mongoose.connect("mongodb://localhost:9888/aiweb",(error)=>{
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