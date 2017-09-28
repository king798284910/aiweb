//接口请求的方法集合
const article = require('../models/article.js');
const share = require('../models/share.js');
const express=require("express");
const router=new express.Router();
const fs = require('fs');
const multiparty = require('multiparty');

router.post('/savearticle',function(req,res){
    //req.body.label = JSON.parse(req.body.label);
    var imgArr = req.body.imgArr.concat([]);//[]上传过的图片的路径

    var imgArrL = req.body.imgArr.length;//上传过的图片的个数

    delete req.body.imgArr;//删除属性

    var reg0 = new RegExp("/images([^<>]*?)\.(gif|png|jpg|jpeg|bmp)", "ig");

    var textImgArr = req.body.content.match(reg0) == null ?[]:req.body.content.match(reg0);//[]

    for (var i = 0; i < imgArrL; i++) {
        for(var j = 0; j < textImgArr.length; j++) {
            textImgArr[j] = '.' + textImgArr[j]
            if(imgArr[i] == textImgArr[j]){
                imgArr.splice(i, 1);
            }
        }
    }//匹配哪些图片在文章中，不在的删掉。

    recursion(0,imgArr);//递归删除多余的img

    article.findOne({'title' : req.body.title}, function(err,data) {
        if(err){
            recursion(0,textImgArr);
            res.json({
                status:-1,
                msg:'提交失败'
            });
        }else{
            if(data==null){
                saveImg(req.body.imgUrl,function(path){
                    if(path){
                        req.body.imgUrl = path;
                        article.create(req.body, function( err1, result ){
                            if(err1){
                                recursion(0,textImgArr);
                                removeImg(path,function(err2){
                                    if(err2){
                                        throw err2;
                                    }
                                    res.json({
                                        status:-1,
                                        msg:'提交失败'
                                    });
                                });
                                // fs.unlink(path,function (err_) {
                                //     if(err_) throw err;
                                //     res.json({
                                //         status:-1,
                                //         msg:'提交失败'
                                //     });
                                // });
                            }else{
                                res.json({
                                    status:1,
                                    msg:'提交成功'
                                });
                            }
                        });
                    }else{
                        recursion(0,textImgArr);
                        res.json({
                            status:-1,
                            msg:'图片保存失败'
                        });
                    }
                });
            }else{
                recursion(0,textImgArr);
                res.json({
                    status:-1,
                    msg:'文章已存在'
                });
            }

        }
    });
});//上传文章接口
router.post('/saveshare',function(req,res){
    
    share.findOne({'content' : req.body.content}, function(err,data) {
        if(err){
            res.json({
                status:-1,
                msg:'提交失败'
            });
        }else{
            if(data==null){
                saveImg(req.body.imgUrl,function(path){
                    if(path){
                        req.body.imgUrl = path;
                        share.create(req.body, function( err1, result ){
                            if(err1){
                                removeImg(path,function(err2){
                                    if(err2){
                                        throw err2;
                                    }
                                    res.json({
                                        status:-1,
                                        msg:'提交失败'
                                    });
                                });
                                // fs.unlink(path,function (err_) {
                                //     if(err_) throw err;
                                //     res.json({
                                //         status:-1,
                                //         msg:'提交失败'
                                //     });
                                // });
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
                            msg:'图片保存失败'
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
});//上传简说接口

router.post('/imgupload',function(req,res){
    var form = new multiparty.Form({uploadDir: './images/'});
    form.parse(req, function(err, fields, files) {

        if(err){
            res.json({
                errno:-1,
                data:[]
            });
        } else {
            var dstPath = files.imgName[0].path;
            res.json({
                errno:0,
                data:['http://localhost:8686/' + dstPath]
            });
            // var inputFile = files.imgName[0];
            // var uploadedPath = inputFile.path;
            // var dstPath = './images/' + inputFile.originalFilename;
            // //重命名为真实文件名
            // fs.rename(uploadedPath, dstPath, function(err) {
            //     if(err){
            //         res.json({
            //             errno:-1,
            //             data:[]
            //         });
            //     } else {
            //         res.json({
            //             errno:0,
            //             data:[dstPath]
            //         });
            //     }
            // });
        }
    });
});//富文本编辑器上传图片接口

function saveImg(data_,cb){
    var extension = '.'+data_.split(';')[0].split('/')[1];
    var path = './images/' + Date.now() + extension;//从app.js级开始找--在我的项目工程里是这样的
    var base64 = data_.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
    var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
    fs.writeFile(path,dataBuffer,function(err){//用fs写入文件
        if(err){
            cb(false);
        }else{
            cb(path);
        }
    })
};//图片bese64转换成图片，并存入文件夹

function removeImg(path_,cb){
    fs.unlink(path_,function (err_) {
        cb(err_);
    });
};//删除图片

function recursion(i,imgArr){
    if(imgArr.length>0){
        removeImg(imgArr[i],function(err3){
            if(err3){
                throw err3;
            }
            if(i<imgArr.length-1){
                recursion(i++,imgArr);
            }
        });
    };
};//递归删除多张图片

module.exports = router;