const mongoose = require('mongoose');

Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
} //时间转格式的方法

var time1 = new Date().format("yyyy-MM-dd hh:mm:ss");//当前时间
var time2 = new Date().format("yyyy-MM-dd");//当前时间
//schema
const shareSchema = new mongoose.Schema({
	imgUrl:String,//文章概览图路径
	content:String,//文章内容
	editDate:{type:String,default : time2},//简说编辑的时间
});//简说

const articleSchema = new mongoose.Schema({
    title:String,//文章标题
    overview:String,//文章概览
    imgUrl:String,//文章概览图路径
    label:String,//文章类型
    content:String,//文章内容
    editDate:{type:String,default : time1},//文章编辑的时间
    author:{type:String,default:'金理学'},//作者
    views:{type:Number,default:0},//浏览次数
});//文章


//model
module.exports = {
    share : mongoose.model('share',shareSchema),
    article : mongoose.model('article',articleSchema),
} 