const mongoose = require('mongoose');

//schema
const shareSchema = new mongoose.Schema({
	imgUrl:String,//文章概览图路径
	content:String,//文章内容
	editDate:String,//简说编辑的时间字符串
    newDate:Date,//简说编辑的的真实时间
});//简说

const articleSchema = new mongoose.Schema({
    title:String,//文章标题
    overview:String,//文章概览
    imgUrl:String,//文章概览图路径
    label:String,//文章类型
    content:String,//文章内容
    editDate:String,//文章编辑的时间
    newDate:Date,//文章编辑的真实时间
    author:{type:String,default:'金理学'},//作者
    views:{type:Number,default:0},//浏览次数
});//文章


//model
module.exports = {
    share : mongoose.model('share',shareSchema),
    article : mongoose.model('article',articleSchema),
} 