<template>
	<div id="app" v-cloak @click='clickA($event)'>
		<progress-bar v-if='progressBarShow'></progress-bar>

		<div class='boxLeft' :class='{active:active3}'>
			<header class="head">
				<div class='headerTop'>
					<h1  v-scrollmove><router-link :to="'/home'" class="blogName">金理学のBlog</router-link></h1>
					<span v-scrollmove>关注互联网最新动态的个人博客网站</span>
					<p @mouseenter='textMouseEnter_ ()' :class='{active:active4}'>世界上最遥远的距离<br>不是天涯与海角<br>而是我在 if<br>你却在 else (>_
						<)</p>
				</div>
				<div class='timaAndmusic'  :class='{TimaAndmusic:ifshowTimaAndmusic,TimaAndmusicOut:!ifshowTimaAndmusic}'>

					<div class='musicEmbed'>
						<embed src="//music.163.com/outchain/player?type=0&id=873274562&auto=0&height=90" />
					</div>
					<div class='timeEmbed'>
						<embed wmode="transparent" src="http://chabudai.sakura.ne.jp/blogparts/honehoneclock/honehone_clock_tr.swf" quality="high" bgcolor="#ffffff" width="270" height="100" name="honehoneclock" align="middle" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer">
					</div>
					<object type="application/x-shockwave-flash" style="outline:none;margin-top:15px" data="http://cdn.abowman.com/widgets/hamster/hamster.swf?up_bodyColor=f0e9cc&amp;up_feetColor=D4C898&amp;up_eyeColor=000567&amp;up_wheelSpokeColor=DEDEDE&amp;up_wheelColor=FFFFFF&amp;up_waterColor=E0EFFF&amp;up_earColor=b0c4de&amp;up_wheelOuterColor=FF4D4D&amp;up_snoutColor=F7F4E9&amp;up_bgColor=F0E4E4&amp;up_foodColor=cba920&amp;up_wheelCenterColor=E4EB2F&amp;up_tailColor=E6DEBE&amp;" width="270" height="200">
						<param name="movie" value="http://cdn.abowman.com/widgets/hamster/hamster.swf?up_bodyColor=f0e9cc&amp;up_feetColor=D4C898&amp;up_eyeColor=000567&amp;up_wheelSpokeColor=DEDEDE&amp;up_wheelColor=FFFFFF&amp;up_waterColor=E0EFFF&amp;up_earColor=b0c4de&amp;up_wheelOuterColor=FF4D4D&amp;up_snoutColor=F7F4E9&amp;up_bgColor=F0E4E4&amp;up_foodColor=cba920&amp;up_wheelCenterColor=E4EB2E&amp;up_tailColor=E6DEBE&amp;">
						<param name="AllowScriptAccess" value="always">
						<param name="wmode" value="opaque">
					</object>
				</div>
			</header>
			<nav class='nav' :class='{active:active5}'>
				<ul>
					<li ref='navLi' v-for="(item,index) in litext">
						<router-link :to="item.path" class="navLink">{{item.text}}</router-link>
					</li>
				</ul>
			</nav>
			<!-- <div class="filter"></div> -->
			<canvas id="canvas"></canvas>
			<keep-alive>
				<router-view class='routerVue clearfix'></router-view>
			</keep-alive>
			<footer class='footer'>©</footer>
		</div>
		<div class='boxRight' :class='{active:active3}'>
			<div class='pictureBox'></div>
			<p class='namep'>金理学</p>
			<p class='jianjie'>生日：1992-10-08</p>
			<p class='jianjie'>籍贯：湖北省—通山县</p>
			<p class='jianjie'>现居：深圳市—宝安区</p>
			<p class='jianjie'>职业：网站制作</p>
			<p class='jianjie'>爱好：羽毛球、乒乓球、游泳</p>
			<p class='dictum'>土地是以它的肥沃和收获而被估价的；才能也是土地，不过它生产的不是粮食，而是真理。如果只能滋生瞑想和幻想的话，即使再大的才能也只是砂地或盐池，那上面连小草也长不出来的。 —— 别林斯基</p>
			<p class='dictum'>人生的磨难是很多的，所以我们不可对于每一件轻微的伤害都过于敏感。在生活磨难面前，精神上的坚强和无动于衷是我们抵抗罪恶和人生意外的最好武器。 —— 洛克</p>
			<div class='editor' @mousedown = 'Touch($event)' @mouseup="TouchUp"></div>
		</div>
		<div class="sidebar-toggle" ref="sidebarToggle" @mouseenter='BtnMouseEnter_()' @mouseleave='BtnMouseLeave_()' @click.stop='BtnClick_()'>
			<div class="sidebar-toggle-line-wrap">
				<span class="sidebar-toggle-line sidebar-toggle-line-first" :class='{active:active,active2:active2}'></span>
				<span class="sidebar-toggle-line sidebar-toggle-line-middle" :class='{active2:active2}'></span>
				<span class="sidebar-toggle-line sidebar-toggle-line-last" :class='{active:active,active2:active2}'></span>
			</div>
		</div>
	</div>

</template>

<script>
	import progressBar from './components/commen/progressBar.vue';
	import axios from 'axios';
	export default {
		name: 'app',
		data() {
			return {
				clickFlag: true,
				active: false,
				active2: false,
				active3: false,
				textFlag: true,
				active4: false,
				active5: false,
				litext: [{
					'text': '首页',
					'path': '/home'
				}, {
					'text': 'H5/C3',
					'path': '/web'
				}, {
					'text': 'IT资讯',
					'path': '/itnews'
				}, {
					'text': '心得笔记',
					'path': '/notes'
				}, {
					'text': '网站运营',
					'path': '/operation'
				}, {
					'text': '分享心情',
					'path': '/share'
				},
				//  {
				// 	'text': '相册',
				// 	'path': '/photo'
				// },
				 {
					'text': '留言板',
					'path': '/message'
				}, ],
				progressBarShow:true,
			}
		},
		components:{
            progressBar
        },
		watch:{
			progressBarShow_(){
				this.progressBarShow = this.progressBarShow_
			},
			
		},
		mounted() {
			var self = this;
			console.log("%c又偷看我的源码！"," text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em")
			console.log('%c再看我打你哦！ ', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;');
			function Star(id, x, y) {
				this.id = id;
				this.x = x;
				this.y = y;
				this.r = Math.floor(Math.random() * 2) + 2;
				var alpha = (Math.floor(Math.random() * 10) + 5) / 10;
				this.color = "rgba(255,255,255," + alpha + ")";
			}

			Star.prototype.draw = function() {
				ctx.fillStyle = this.color;
				ctx.shadowBlur = this.r * 2;
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
				ctx.closePath();
				ctx.fill();
			}

			Star.prototype.move = function() {
				this.y -= .3;
				if(this.y <= -10) this.y = HEIGHT + 10;
				this.draw();
			}

			Star.prototype.die = function() {
				stars[this.id] = null;
				delete stars[this.id];
			}

			function Dot(id, x, y, r) {
				this.id = id;
				this.x = x;
				this.y = y;
				this.r = Math.floor(Math.random() * 5) + 1;
				this.maxLinks = 2;
				this.speed = .5;
				this.a = .7;
				this.aReduction = .005;
				this.color = "rgba(255,255,255," + this.a + ")";
				this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";

				this.dir = Math.floor(Math.random() * 140) + 200;
			}

			Dot.prototype.draw = function() {
				ctx.fillStyle = this.color;
				ctx.shadowBlur = this.r * 2;
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
				ctx.closePath();
				ctx.fill();
			}

			Dot.prototype.link = function() {
				if(this.id == 0) return;
				var previousDot1 = getPreviousDot(this.id, 1);
				var previousDot2 = getPreviousDot(this.id, 2);
				var previousDot3 = getPreviousDot(this.id, 3);
				if(!previousDot1) return;
				ctx.strokeStyle = this.linkColor;
				ctx.moveTo(previousDot1.x, previousDot1.y);
				ctx.beginPath();
				ctx.lineTo(this.x, this.y);
				if(previousDot2 != false) ctx.lineTo(previousDot2.x, previousDot2.y);
				if(previousDot3 != false) ctx.lineTo(previousDot3.x, previousDot3.y);
				ctx.stroke();
				ctx.closePath();
			}

			function getPreviousDot(id, stepback) {
				if(id == 0 || id - stepback < 0) return false;
				if(typeof dots[id - stepback] != "undefined") return dots[id - stepback];
				else return false; //getPreviousDot(id - stepback);
			}

			Dot.prototype.move = function() {
				this.a -= this.aReduction;
				if(this.a <= 0) {
					this.die();
					return
				}
				this.color = "rgba(255,255,255," + this.a + ")";
				this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";
				this.x = this.x + Math.cos(degToRad(this.dir)) * this.speed,
					this.y = this.y + Math.sin(degToRad(this.dir)) * this.speed;

				this.draw();
				this.link();
			}

			Dot.prototype.die = function() {
				dots[this.id] = null;
				delete dots[this.id];
			}

			var canvas = document.getElementById('canvas'),
				ctx = canvas.getContext('2d'),
				WIDTH,
				HEIGHT,
				mouseMoving = false,
				mouseMoveChecker,
				mouseX,
				mouseY,
				stars = [],
				initStarsPopulation = 100,
				dots = [],
				dotsMinDist = 2,
				maxDistFromCursor = 50;

			setCanvasSize();
			init();

			function setCanvasSize() {
				WIDTH = document.documentElement.clientWidth,
					HEIGHT = document.documentElement.clientHeight;

				canvas.setAttribute("width", WIDTH);
				canvas.setAttribute("height", HEIGHT);
			}

			function init() {
				ctx.strokeStyle = "white";
				ctx.shadowColor = "white";
				for(var i = 0; i < initStarsPopulation; i++) {
					stars[i] = new Star(i, Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT));
					//stars[i].draw();
				}
				ctx.shadowBlur = 0;
				animate();
			}

			function animate() {
				ctx.clearRect(0, 0, WIDTH, HEIGHT);

				for(var i in stars) {
					stars[i].move();
				}
				for(var i in dots) {
					dots[i].move();
				}
				drawIfMouseMoving();
				requestAnimationFrame(animate);
			}

			window.onmousemove = function(e) {
				mouseMoving = true;
				mouseX = e.clientX;
				mouseY = e.clientY;
				clearInterval(mouseMoveChecker);
				mouseMoveChecker = setTimeout(function() {
					mouseMoving = false;
				}, 100);
			}

			function drawIfMouseMoving() {
				if(!mouseMoving) return;

				if(dots.length == 0) {
					dots[0] = new Dot(0, mouseX, mouseY);
					dots[0].draw();
					return;
				}

				var previousDot = getPreviousDot(dots.length, 1);
				var prevX = previousDot.x;
				var prevY = previousDot.y;

				var diffX = Math.abs(prevX - mouseX);
				var diffY = Math.abs(prevY - mouseY);

				if(diffX < dotsMinDist || diffY < dotsMinDist) return;

				var xVariation = Math.random() > .5 ? -1 : 1;
				xVariation = xVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
				var yVariation = Math.random() > .5 ? -1 : 1;
				yVariation = yVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
				dots[dots.length] = new Dot(dots.length, mouseX + xVariation, mouseY + yVariation);
				dots[dots.length - 1].draw();
				dots[dots.length - 1].link();
			}
			//setInterval(drawIfMouseMoving, 17);

			function degToRad(deg) {
				return deg * (Math.PI / 180);
			};

			//侧边栏数据的请求
			axios.get('/api/asideinfo')
            .then(function (res) {
            	self.$store.commit('getAsideData',res.data);
            });
            
		},
		computed:{
			ifshowTimaAndmusic(){
				return this.$store.state.asideFlag
			},
			progressBarShow_(){
		        return this.$store.state.progressBarShow
			},
		},
		methods: {
			textMouseEnter_() {
				if(this.textFlag) {
					this.textFlag = false;
					this.active4 = true;
				} else {
					this.textFlag = true;
					this.active4 = false;
				}
			},
			BtnMouseEnter_() {
				this.active = true;
			},
			BtnMouseLeave_() {
				this.active = false;
			},
			BtnClick_() {
				if(this.clickFlag) {
					this.clickFlag = false;
					this.active2 = true;
					this.active3 = true;
				} else {
					this.clickFlag = true;
					this.active2 = false;
					this.active3 = false;
				}
			},
			Touch(e){
				let self = this;
			 	let el = e.currentTarget;
			 	document.onkeydown=function(event){
	            	var e = event || window.event || arguments.callee.caller.arguments[0];
	            	e.preventDefault();
		            if (e.keyCode == 13 && e.ctrlKey) {
		                self.$router.push({path:'/editor'});
		            }
				};
			},
			TouchUp(){
				document.onkeydown=null;
			},
			clickA(e){
				var test = window.location.pathname;
				var target = e.target;
				var currentTarget = e.currentTarget;
				
				while(target !== currentTarget ){
		            if(target.tagName == 'A'){
		                if(e.target.pathname != test){
							this.$store.commit('progressBarisNo');
      						this.$store.commit('progressBarShow_');
						}
		                break;
		            }
		            target = target.parentNode;
		        }
			}
		}
	}
</script>

<style>
	@import "assets/css/reset.css";
	body {
		background: url('assets/img/bg.jpg') #7DE6F3 no-repeat;
		/*background-attachment: fixed;*/
		background-size: 100% auto;
	}

	#app {
		height: 100%;
		width: 100%;
	}

	.boxRight {
		width: 300px;
		position: fixed;
		right: 0;
		top: 0;
		background: rgba(255, 255, 255, 0.3);
		box-shadow:rgba(254, 87, 87, 0.2) -1px 0px 10px;
		height: 100%;
		transform: translateX(100%);
		transition: all 0.5s;
	}

	.boxLeft {
		position: relative;
		overflow: hidden;
		width: 100%;
		transition: all 0.5s;
		min-height: 1030px;
		border-top: 1px solid transparent;
	}

	.boxLeft.active {
		width: calc(100% - 300px);
		transition: all 0.5s;
	}

	.boxRight.active {
		transform: translateX(0);
	}

	.sidebar-toggle {
		position: fixed;
		right: 30px;
		bottom: 45px;
		width: 14px;
		height: 14px;
		padding: 7px;
		background: #db7093;
		line-height: 0;
		z-index: 1050;
		cursor: pointer;
		border-radius: 50%;
	}

	.sidebar-toggle-line {
		position: relative;
		display: inline-block;
		vertical-align: top;
		height: 2px;
		width: 100%;
		background: #fff;
		margin-top: 3px;
		opacity: 1;
		transition: all 0.3s;
	}

	.sidebar-toggle-line:first-child {
		margin-top: 1px;
	}

	.sidebar-toggle-line-first.active {
		width: 50%;
		top: 2px;
		transform: rotateZ(-45deg);
		opacity: 1;
		left: 0px;
	}

	.sidebar-toggle-line-last.active {
		width: 50%;
		top: -2px;
		transform: rotateZ(45deg);
		opacity: 1;
		left: 0px;
	}

	.sidebar-toggle-line-first.active2 {
		width: 100%;
		top: 5px;
		transform: rotateZ(-45deg);
		opacity: 1;
		left: 0px;
	}

	.sidebar-toggle-line-middle.active2 {
		opacity: 0;
	}

	.sidebar-toggle-line-last.active2 {
		width: 100%;
		top: -5px;
		transform: rotateZ(45deg);
		opacity: 1;
		left: 0px;
	}

	.routerVue {
		position: relative;
		top: 0;
		width: 1030px;
		margin: 125px auto 70px;
		z-index: 99;
	}

	.nav {
		width: 100%;
		height: 40px;
		position: absolute;
		top: 160px;
		z-index: 99;
		font-size: 14px;
		background: linear-gradient(to right, rgba(255, 123, 173, 0) 0%, rgba(124, 189, 253, 0.6) 20%, rgba(124, 189, 253, 0.6) 80%, rgba(255, 123, 173, 0) 100%);
		/*background: linear-gradient(to right,rgba(255, 167, 73, 0.2) 0%,rgb(255, 167, 73) 20%,rgb(255, 167, 73) 80%,rgba(255, 167, 73, 0.2) 100%);*/
		animation: headMove 1s ease-out;
	}

	/*.nav.active {
		position: fixed;
		width: calc(100% - 300px);
		z-index: 999;
		top: 0;
		background: linear-gradient(to right, rgba(255, 123, 173, 0) 0%, rgba(124, 189, 253, 1) 20%, rgba(124, 189, 253, 1) 80%, rgba(255, 123, 173, 0) 100%);
		overflow: hidden;
	}*/

	.nav ul {
		width: 1030px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}

	.nav ul li {
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		display: inline-block;
		color: #fff;
		cursor: pointer;
	}

	#canvas {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		pointer-events: none;
		z-index: 100001;
	}
	/*.filter {
  width:100%;
  height:100%;
  position:fixed;
  top:0;
  left:0;
  pointer-events: none;
  background: url('assets/img/bg.jpg') #7DE6F3 no-repeat;
  background: linear-gradient(to bottom,#7DE6F3 70%,rgba(125, 230, 243,0.5) 100%);
  /*background:#fe5757;
  animation:colorChange 30s ease-in-out infinite;
  animation-fill-mode:both;
  mix-blend-mode:overlay;
}*/

	@keyframes colorChange {
		0%,
		100% {
			color: #00fffc;
			top:-7px;
		}
		10% {
			color: #00ffa2;
		}
		20% {
			color: #66ff00;
			top:7px;
			}
		30% {
			color: #90ff00;
		}
		40% {
			color: #eaff00;
		}
		50% {
			color: #ffc000;
			top:-7px;
		}
		60% {
			color: #ff7200;
		}
		70% {
			color: #ff2a00;
		}
		80% {
			color: #ff0078;
			top:7px;
		}
		90% {
			color: #f000ff;
		}
		
	}
	@keyframes headMove {
		0%{
			transform: translateY(-20px);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}

	}
	.canvasBox {
		width: 1000px;
		height: 100px;
		margin: 0 auto;
	}

	.head {
		width: 1030px;
		height: 80px;
		margin: 30px auto 0;
		position: relative;
		/*z-index: 999;*/
	}

	.headerTop {
		color: #fff;
		/*text-align: center;*/
		font-size: 16px;
		text-shadow: #fe5757 1px 1px 3px;
		position: relative;
	}

	.headerTop span {
		display: inline-block;
		position: relative;
		font-size: 12px;
		top: 25px;
		cursor: pointer;
	}

	.headerTop p {
		position: absolute;
		font-size: 12px;
		right: 90px;
		top: 0;
		letter-spacing: 1px;
		line-height: 20px;
		animation: colorChange 6s ease-in-out infinite;
		animation-fill-mode: both;
		mix-blend-mode: overlay;
		cursor: pointer;
		transition: all 0.3s;
		font-style: italic;
	}

	.headerTop p.active {
		transform: translateX(-200%);
	}

	.headerTop h1 {
		font-size: 26px;
		font-weight: normal;
	}

	.blogName {
		color: #fff;
		position: relative;
	}

	.blogName:before {
		content: "";
		position: absolute;
		width: 100%;
		height: 2px;
		bottom: -5px;
		left: 0;
		background-color: #db7093;
		visibility: hidden;
		transform: scaleX(0);
		transition: all 0.3s;
	}

	.navLink {
		display: inline-block;
		width: 100%;
		height: 100%;
		color: #fff;
		text-shadow: #fe5757 1px 1px 1px;
		transition: all 0.5s;
		transform: rotate(-35deg);
		background: rgba(255, 255, 255, 0.4);
		border-radius: 50px 0;
	}

	.navLink:hover {
		transform: rotate(0);
		background: #ff7bad;
		font-weight: bold;
	}

	.nav .router-link-exact-active ,.nav .router-link-active{
		transform: rotate(0);
		background: #ff7bad;
		font-weight: bold;
	}

	.blogName.router-link-exact-active {
		transform: rotate(0);
		background: transparent;
	}

	.blogName:hover::before {
		content: "";
		visibility: visible;
		transform: scaleX(1);
	}

	.footer {
		height: 40px;
		width: 100%;
		line-height: 40px;
		color: #fff;
		text-shadow: #fe5757 1px 1px 1px;
		text-align: center;
		background: rgba(255, 255, 255, 0.5);
		position: absolute;
		bottom: 0;
	}

	.timaAndmusic {
		position: absolute;
		z-index: 100;
		top: 205px;
		right: 0;
		width: 270px;
		transform: translateX(10000px);
	}

	.timeEmbed {
		box-shadow: 0 0 10px #ccc;
		background: rgba(255,255,255,0.5);
		margin-top: 15px;
	}

	.musicEmbed{
		position: relative;

		width: 270px;
		height: 90px;
		box-shadow: 0 0 10px #ccc;
		border-radius: 3px;
		overflow: hidden;
	}
	.musicEmbed embed{
		position: absolute;
		top: -10px;
		left: -20px;
	}
	.editor{
		width: 40px;
		height: 40px;
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.pictureBox{
		height: 100px;
		width: 100px;
		margin:100px auto 0;
		border-radius: 50%;
		overflow: hidden;
		background: url(./assets/img/headpic2.jpg) center -28px;
		background-size: 100px;
		cursor: pointer;
		transition:all 1s;
	}
	.pictureBox:hover{
		transform: scale(1.3) rotateZ(360deg);
	}
	.namep{
		margin: 15px 0 25px;
		text-align: center;
		color: #ef3900;
		font-weight: bold;
	}
	.jianjie{
		margin-top: 10px;
		font-size: 12px;
		text-align: center;
		color: #ef7000;
	}
	.dictum{
		width: 240px;
		margin: 40px auto 0;
		line-height: 30px;
		font-size: 12px;
		text-indent: 2em;
		color: #ef7000;
	}
@media screen and (max-width: 1280px) {
    .sidebar-toggle {
        display: none;
    }
    body{
    	min-width: 1280px;
    }
}
	</style>