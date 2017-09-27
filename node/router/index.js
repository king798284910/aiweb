//接口请求的方法集合
const article = require('../models/article.js');
const share = require('../models/share.js');
const express=require("express");
const router=new express.Router();
const fs = require('fs');

router.post('/savearticle',function(req,res){
    //req.body.label = JSON.parse(req.body.label);
    saveImg(req.body.imgUrl,function(path){
        if(path){
            req.body.imgUrl = path;
            article.findOne({'title' : req.body.title}, function(err,data) {
                if(err){
                    res.json({
                        status:-1,
                        msg:'提交失败'
                    });
                }else{
                    if(data==null){
                        article.create(req.body, function( err, result ){
                            if(err){
                                res.json({
                                    status:-1,
                                    msg:'提交失败'
                                });
                            }else{
                                res.json({
                                    status:1,
                                    msg:'提交成功'
                                });
                            }
                        });

                    }else{
                        res.json({
                            status:-1,
                            msg:'文章已存在'
                        });
                    }

                }
            });
        }else{
            res.json({
                status:-1,
                msg:'图片保存失败'
            });
        }

    });
    
});
router.post('/saveshare',function(req,res){
    saveImg(req.body.imgUrl,function(path){
        if(path){
            req.body.imgUrl = path;
            share.findOne({'content' : req.body.content}, function(err,data) {
                if(err){
                    res.json({
                        status:-1,
                        msg:'提交失败'
                    });
                }else{
                    if(data==null){
                        share.create(req.body, function( err, result ){
                            if(err){
                                res.json({
                                    status:-1,
                                    msg:'提交失败'
                                });
                            }else{
                                res.json({
                                    status:1,
                                    msg:'提交成功'
                                });
                            }
                        });

                    }else{
                        res.json({
                            status:-1,
                            msg:'简说已存在'
                        });
                    }

                }
            });
        }else{
            res.json({
                status:-1,
                msg:'图片保存失败'
            });
        }

    });

});
function saveImg(data_,cb){
    var path = './images/' + Date.now() +'.png';//从app.js级开始找--在我的项目工程里是这样的
    var base64 = data_.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
    var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
    fs.writeFile(path,dataBuffer,function(err){//用fs写入文件
        if(err){
            cb(false);
        }else{
            cb(path);
        }
    })

};

module.exports = router;