var mongoose = require('mongoose');


//schema

let shareSchema = new mongoose.Schema({
	imgUrl:String,//文章概览图路径
	content:String,//文章内容
	editDate:{type:Date,default:new Date()},//文章编辑的时间
});

//model
export default mongoose.model('share',shareSchema);