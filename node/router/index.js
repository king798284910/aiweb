//接口请求的方法集合
const article = require('../models/article.js');
const share = require('../models/share.js');
const express=require("express");
const router=new express.Router();

router.get('/savearticle',function(req,res){
    res.send('ok');

});


module.exports = router;