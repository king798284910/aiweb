<template>
	<div class="wrapper">
		<main class='main' :class='{moveInMain:asideMoveIn,moveOutMain:!asideMoveIn}'>
			<div class='banner'>
				<h3 v-scrollmove>
      			<p><span>热门</span>文章 New Blog</p>
      			</h3>
				<router-link :to="'/web/59e4bfda170b230baff812e8'" class='imgBoxLeft vueA'>
					<span>建站历程</span>
					<img :src="banner" />
				</router-link>
				<ul class="topblog">
					<li v-for='item in top3'>
						<router-link class='vueA' :to="JSON.parse(item.label).Vpath + '/' + item._id">{{item.title}}<span>{{item.overview}}</span></router-link>
					</li>
				</ul>
				<h3 v-scrollmove><p><span>心得笔记</span>  Journey</p></h3>
				<ul class="template">
					<li v-for = 'item in asideData.notes' v-scrollmove>
						<router-link class='vueA' :to="JSON.parse(item.label).Vpath + '/' + item._id" :title="item.title">
							<img :src="item.imgUrl">
						</router-link>
						<span>{{item.title}}</span>
					</li>
				</ul>
				<h3 v-scrollmove><p><span>推荐文章</span>  Journey</p></h3>
			</div>
			<ul class='l-article'>
				<li v-for='item in listData' v-scrollmove>
					<h2><router-link :to="JSON.parse(item.label).Vpath + '/' + item._id" class='textTitleA vueA' :title="item.title"  >{{item.title}}</router-link></h2>
					<router-link :to="JSON.parse(item.label).Vpath + '/' + item._id" :title="item.title" rel="bookmark" class="a-pic-link vueA">
						<img :src="item.imgUrl" :alt="item.title" :title="item.title" class="a-pic l">
					</router-link>
					<div class="a-con">
						<p>{{item.overview}} . . .</p>
						<router-link :to="JSON.parse(item.label).Vpath + '/' + item._id" class="a-more vueA" >阅读全文&gt;&gt;</router-link>
					</div>
					<p class='autor'>
						<span class='paddings textTime'>{{item.editDate}}</span>
						<span class='paddings fenlei'>[<router-link :to="JSON.parse(item.label).Vpath" class="fenleiA vueA" >{{JSON.parse(item.label).text}}</router-link>]</span>
						<span class='paddings liulan'>浏览({{item.views}})</span>
						<span class='paddings author'>{{item.author}}</span>
					</p>
				</li>

			</ul>
			<v-page @pPage='getPost' :all='all' :pCur='page' :imgflag='imgflag'></v-page>
			<!-- <div id="uyan_frame"></div> -->
		</main>
		<aside class='aside' :class='{moveIn:asideMoveIn,moveOut:!asideMoveIn}'>
			<v-side></v-side>
		</aside>
	</div>
</template>

<script>
    import vSide from './commen/aside.vue';
    import vPage from './commen/pageBar.vue';
    import store from '../vuex';
    import axios from 'axios';
	export default {
		name: 'home',
		data() {
			return {
				banner: require("../assets/img/home.png"),
				page:1,
				all:1,
				imgflag:false,
				listData:[],
			}
		},
		components:{
            vSide,
            vPage
        },
        computed:{
			asideMoveIn(){
				return this.$store.state.asideMoveFlag
			},
			asideData(){
                return this.$store.state.asideData
            },
            top3(){
            	return this.asideData.hotBlog.slice(0,3)
            }
		},
        activated(){
			var self = this;
        	self.$store.commit('changeAsideT');
        	self.$store.commit('changeMoveT');
    //     	var body = document.getElementsByTagName('body')[0];
    //     	var script_ = document.getElementById('script1');
    //     	if(script_){
    //     		body.removeChild(script_);
    //     	}
        	
    // 　　　　var script = document.createElement("script");

    //         script.setAttribute("src", "http://v3.uyan.cc/code/uyan.js");
    //         script.setAttribute("id", "script");
    //         body.appendChild(script);
        },
        beforeRouteEnter (to, from, next) {
        	let page = store.state.homePage;
      		// store.commit('progressBarisNo');
      		// store.commit('progressBarShow_');

      		axios.get('/api/getarticle',{
        		params:{
        			lable:'home',
        			page:page,
        			limit:6,
        		}
			})
			.then(function(res){
				store.commit('progressBarisOk');
      			store.commit('changeAsideF');
		    	store.commit('changeMoveF');
  				next(vm => {
  					vm.listData = res.data.listData
					vm.all=res.data.count;
					vm.page = page;
	        	})
			})
			.catch(function(err){
			    console.log(err);

			});
	  	},
        methods:{
        	getPost(page) {
        		let self = this;
        		self.$store.commit('changePage',{obj:'homePage',page:page});
        		self.page = page;
        		self.imgflag = true;

	        	axios.get('/api/getarticle',{
	        		params:{
	        			lable:'home',
	        			page:page,
	        			limit:6,
	        		}
				})
				.then(function(res){
	  				self.imgflag = false;
	  				self.listData = res.data.listData
					self.all=res.data.count;
	  				document.documentElement.scrollTop = document.body.scrollTop = 0;
				})
				.catch(function(err){
				  	console.log(err);
				  	self.imgflag = false;
				  	self.listData = [];
	  				document.documentElement.scrollTop = document.body.scrollTop = 0;
				});
		    }
        },
        mounted(){

        	
        }
	}
</script>
<style scoped>
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
		display: inline-block;
		width: calc(50% - 20px);
		height: 206px;
		padding:10px;
		margin: 0 10px;
		box-sizing: border-box;
		float: left;
		border:1px solid #fff;
		position: relative;
		overflow: hidden;
		transition: all 1s;
	}
	.imgBoxLeft:hover{
		transform: scale(1.03);
	}
	.imgBoxLeft span{
	    position: absolute;
	    height:calc(100% - 20px);
	    width:30px;
        background: rgba(255, 255, 255, 0.4);
    	color: #ef7000;
	    font-size: 16px;
	    font-weight: bold;
	    text-align: center;
	    line-height: 46px;
	    display: inline-block;
	    top: 10px;
	    left: 10px;
	    overflow: hidden;
	}
	.imgBoxLeft img {
		width: calc(100% - 30px);
		height: 100%;
		border: none;
		margin-left: 30px;
		box-sizing: border-box;
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
		line-height: 26px;
		float: right;
		width: calc(50% - 7px);
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
		padding: 7px 10px 7px 50px;
		transition: all 0.3s;
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
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
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
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
	@keyframes listMove {
		0%{
			transform: translateX(30px);
			opacity: 0;
		}
		100% {
			transform: translateX(0);
			opacity: 1;
		}

	}
	.template li.move:nth-child(1){
		animation: listMove 0.5s;
	}
	.template li.move:nth-child(2){
		animation: listMove 1s;
	}
	.template li.move:nth-child(3){
		animation: listMove 1.5s;
	}
	.template li.move:nth-child(4){
		animation: listMove 2s;
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
		border: none;
		/*box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);*/
		display: block;
	}
	
</style>