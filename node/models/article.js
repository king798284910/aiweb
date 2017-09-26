const mongoose = require('mongoose');

//schema

const articleSchema = new mongoose.Schema({
	title:String,//文章标题
	overview:String,//文章概览
	imgUrl:String,//文章概览图路径
	label:Object,//文章类型
	content:String,//文章内容
	editDate:{type:Date,default:new Date()},//文章编辑的时间
	author:{type:String,default:'金理学'},//作者
	views:{type:Number,default:0},//浏览次数
});

//model
module.exports = mongoose.model('article',articleSchema);
