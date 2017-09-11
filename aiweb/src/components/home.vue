<template>
	<div class="wrapper">
		<main class='main' :class='{moveInMain:asideMoveIn,moveOutMain:!asideMoveIn}'>
			<div class='banner'>
				<h3>
      			<p><span>热门</span>文章 New Blog</p>
      		</h3>
				<router-link :to="'/web/688'" class='imgBoxLeft'>
					<img :src="banner" />
				</router-link>
				<ul class="topblog">
					<li>
						<router-link :to="'/web/16036'">腾讯云和阿里云对比哪个好？云计<span>在对比每一款产品时，本文先通过一系列的标准化测...</span></router-link>
					</li>
					<li>
						<router-link :to="'/web/15346'">dux主题1.8下载-大前端主题<span>最近看到很多找大前端主题dux主题1.8下载的，我也...</span></router-link>
					</li>
					<li>
						<router-link :to="'/web/2479'">网络刷单骗子伎俩揭晓<span>很多大学生总想赚钱，看到网上各类刷单广告心痒的...</span></router-link>
					</li>
				</ul>
				<h3><p><span>心得笔记</span>  Journey</p></h3>
			<ul class="template">
				<li>
					<router-link :to="'/web/16036'" title="16篇大数据分析好文推荐！">
						<img src="../assets/img/defaultpic.gif" alt="16篇大数据分析好文推荐！">
					</router-link>
					<span>16篇大数据分析好文推荐！</span>
				</li>
				<li>
					<router-link :to="'/web/16036'" title="怎么样上网可以避免泄露重要的个人隐私"><img src="../assets/img/defaultpic.gif" alt="怎么样上网可以避免泄露重要的个人隐私"></router-link><span>怎么样上网可以避免泄露重要的个人隐私</span></li>
				<li>
					<router-link :to="'/web/16036'" title="明天就要高考了，这些事一定要提前知道啊"><img src="../assets/img/defaultpic.gif" alt="明天就要高考了，这些事一定要提前知道啊"></router-link><span>明天就要高考了，这些事一定要提前知道啊</span></li>
				<li>
					<router-link :to="'/web/16036'" title="关于成为一个有目标感的人的清单"><img src="../assets/img/defaultpic.gif" alt="关于成为一个有目标感的人的清单"></router-link><span>关于成为一个有目标感的人的清单</span></li>
			</ul>
			<h3><p><span>推荐文章</span>  Journey</p></h3>
			</div>
			<ul class='l-article'>
				<li>
					<h2><router-link :to="'/web/16036'" class='textTitleA' title="新的一年，继续在前端这条路上前行"  >新的一年，继续在前端这条路上前行</router-link></h2>
					<router-link :to="'/web/16036'" title="新的一年，继续在前端这条路上前行" rel="bookmark" class="a-pic-link">
						<img src="http://www.mxxia.com/wp-content/uploads/2017/02/timg.jpg" alt="新的一年，继续在前端这条路上前行" title="" class="a-pic l">
					</router-link>
					<div class="a-con">
						<p>自从工作以来，工作繁忙，很少来打理博客，索引量一直在下降，现在只有169，但查了下排名，搜索个人博客和前端博客，能排在六七页这样，还算是不错的。 建了博客也一年多了，但并没有发表很多文章，没有记录什么学习笔记 ，也是深感惭愧啊。每天忙忙碌碌的，也没做出什么成绩，技术也并没有很大提高，经常在加班中度过。。。。。。</p>
						<router-link :to="'/itnews/16036'" class="a-more" >阅读全文&gt;&gt;</router-link>
					</div>
					<p class='autor'>
						<span class='paddings textTime'>2017-09-01 18:26:54</span>
						<span class='paddings fenlei'>[<router-link :to="'/web/16036'" class="fenleiA" >H5/C3</router-link>]</span>
						<span class='paddings liulan'>浏览(666)</span>
						<span class='paddings author'>金理学</span>
					</p>
				</li>

			</ul>
		</main>
		<aside class='aside' :class='{moveIn:asideMoveIn,moveOut:!asideMoveIn}'>
			<v-side></v-side>
		</aside>
	</div>
</template>

<script>
    import vSide from './aside.vue';
	export default {
		name: 'home',
		data() {
			return {
				banner: require("../assets/img/home.png"),
			}
		},
		components:{
            vSide
        },
        computed:{
			asideMoveIn(){
				return this.$store.state.asideMoveFlag
			},
			// asideMoveOut(){
			// 	return this.$store.state.changeMoveOutFlag
			// },
		},
        activated(){
			var self = this;
        	self.$store.commit('changeAsideT');
        	self.$store.commit('changeMoveT');

        },
        beforeRouteLeave (to, from, next) {
        	var self = this;
		    //self.$store.commit('changeMoveOutT');
		    self.$store.commit('changeAsideF');
		    self.$store.commit('changeMoveF');
		    setTimeout(function(){
		    	//self.$store.commit('changeMoveOutF');
		    	next();
	    	},300);

	  	},
        methods:{

        },
	}
</script>
<style scoped>
	@import "../assets/css/reset.css";
	.wrapper {}

	.main {
		float: left;
		width: 745px;
		/*background: rgba(255, 255, 255, 0.5);*/
		/*box-shadow: 0 0 10px #ccc;*/
	}

	.aside {
		margin-top: 435px;
		float: right;
		width: 270px;
		/*box-shadow: 0 0 10px #ccc;
		background: rgba(255, 255, 255, 0.5);*/
	}

	.banner {
		width: 100%;
		background: rgba(255, 255, 255, 0.5);
	}

	.imgBoxLeft {
		width: 400px;
	}

	.imgBoxLeft img {
		width: 315px;
		height: 203px;
		margin-left: 10px;
		clear: left;
		float: left;
	}

	h3 {
		border-bottom: #FFF 1px solid;
		width: 100%;
		overflow: hidden;
		font-size: 14px;
		margin: 0 0 10px;
		display: block;
		clear: both;
	}

	h3 p {
		background: #474645;
		width: 180px;
		height: 25px;
		margin: 15px 0 0 10px;
		line-height: 25px;
		color: #fff;
		text-align: center;
		box-shadow: #999 4px 5px 1px;
	}

	h3 p span {
		color: #fd5daa;
	}

	.topblog {
		background: url(../assets/img/libg.png) no-repeat 15px 15px;
		border: #dddddd 1px solid;
		border-left: 0;
		border-bottom: 0;
		line-height: 26px;
		float: right;
		width: 55%;
		margin-right: 5px;
		overflow: hidden;
	}

	.topblog li {
		text-align: center;
		border-bottom: #dddddd 1px solid;
		border-top: #FFF 1px solid;
	}

	.topblog li a {
		color: #ef7000;
		font-size: 20px;
		font-weight: bold;
		display: block;
		height: 52px;
		padding: 7px 0;
		transition: all 0.3s;
	}

	.topblog li a:hover {
		background: rgba(255, 255, 255, 0.4);
		color: #ef3900;
	}

	.topblog li a:hover span {
		color: #ef7000;
		text-shadow: none;
	}

	.topblog li span {
		display: block;
		font-size: 12px;
		color: #ef3900;
		font-weight: normal;
		transition: all 0.3s;
	}

	.template {
		padding: 0 0 0 20px;
		overflow: hidden;
		margin: 0 5px;
	}

	.template li {
		margin: 11px;
		float: left;
		width: 150px;
		position: relative;
		transition: all 1s ;
	}
	.template li:hover{
		transform: scale(1.1);
	}
	.template li span{
		position: absolute;
		width: 142px;
		height: 24px;
		background: rgba(0,0,0,0.4);
		font-size: 12px;
		color: #fff;
		text-align: center;
		line-height: 24px;
		display: inline-block;
		bottom: 4px;
		left: 4px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		pointer-events: none;
	}
	.template li img {
		width: 142px;
		height: 80px;
		background: #FFF;
		padding: 4px;
		box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
		display: block;
	}
	ul.l-article li {
	box-sizing: border-box;
    height: auto;
    box-shadow: 1px 1px 5px #bbb;
    border-radius: 5px;
    margin-bottom: 20px;
    width: 745px;
    padding: 10px 20px;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.5);
    transition: all 0.5s;
	}
	ul.l-article li:hover{
		background: rgba(255, 255, 255, 0.7);
	}
	ul.l-article li h2 {
		font-size: 14px;
    margin-bottom: 10px;
    font-weight: bold;
    position: relative;
}
	ul.l-article li h2 a{
		color: #333;
	}
	ul.l-article li:hover img.a-pic {
		transform: scale(1.05);
	}
	ul.l-article li img.a-pic {
    width: 180px;
    height: 120px;
    border: 1px solid #bbb;
    padding: 3px;
    transition: all 0.6s;
}
	ul.l-article li div.a-con p {
    line-height: 30px;
    text-indent: 2em;
}
	ul.l-article li div.a-con {
    position: relative;
    width: 500px;
    min-height: 120px;
    float: right;
	}
	ul.l-article li div.a-con a.a-more {
	position: absolute;
    bottom: -10px;
    right: 10px;
    width: 90px;
    height: 30px;
    line-height: 30px;
    background: #fd8a61;
    text-align: center;
    color: #fff;
    border-radius: 4px;
	}
	.autor {
    overflow: hidden;
    margin-top: 10px;
    display: inline-block;
    color: #999;
    width: 100%;
	}
	.paddings{
		display: inline-block;
		margin-right:20px;
		padding-left: 25px;
		line-height: 22px;
		background-size: 20px!important;

	}
	.textTime{
		background: url(../assets/img/clock.png) no-repeat left center;
	}
	.fenlei{
		background: url(../assets/img/label.png) no-repeat left 2px;
	}
	.liulan{
		background: url(../assets/img/browse.png) no-repeat left center;
	}
	.author{
		background: url(../assets/img/author.png) no-repeat left center;
		background-size: 16px!important;
	}
	.textTitleA{
		display: inline-block;
		transition: all 0.5s;
	}
	.textTitleA:hover{
		transform: translateX(20px);
		color: #ef3900;
	}
	.fenleiA{
		transition: all 0.5s;
		color:#759b08;

	}
	.fenleiA:hover{
		color:#ef3900;
		text-decoration:underline;
	}
</style>