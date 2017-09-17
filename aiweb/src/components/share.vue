<template>
	<div class="wrapper">
		<main class='main' :class='{moveInMain:asideMoveIn,moveOutMain:!asideMoveIn}'>
			<v-crumbs :Rlist='Rlist'></v-crumbs>
			<ul class='list'>
				<li class="list-li clearfix">
     				<div class="say-pic-box">
		               <img src="http://www.duanliang920.com/uploads/141008/1-14100QG622R6.jpg"  alt="你愿与我一路同行，我将为你背负行囊！---加油 2015~">
		            </div>
		            <div class="say-text">
		               	<p class="info">
		               		你愿与我一路同行，我将为你背负行囊！---加油 2015~你你愿与我一路同行，你愿与我一路同行，我将为你背负行囊！---加油 2015~你愿与我一路同行，我将为你背负行囊！---加油 2015~我将为你背负行囊！---加油 2015~愿与我一路同行，我将为你背负行囊！---加油 2015~
		                 	<span class="date-time">
		                 		2015-02-19
		                 	</span> 
		                </p>
		            </div>
     			</li>
     			<li class="list-li clearfix">
     				<div class="say-pic-box">
		               <img src="http://www.duanliang920.com/uploads/141008/1-14100QG622R6.jpg"  alt="你愿与我一路同行，我将为你背负行囊！---加油 2015~">
		            </div>
		            <div class="say-text">
		               	<p class="info">
		               		你愿与我一路同行，我将为你背负行囊！---加油 2015~
		                 	<span class="date-time">
		                 		2015-02-19
		                 	</span> 
		                </p>
		            </div>
     			</li>
			</ul>
		</main>
	</div>
</template>

<script>
    import store from '../vuex';
    import vCrumbs from './commen/crumbs.vue';
	export default {
		name: 'share',
		data() {
			return {
				Rlist:[],
				
			}
		},
        components:{
            vCrumbs
        },
        computed:{
            asideMoveIn(){
                return this.$store.state.asideMoveFlag
            },
            // asideMoveOut(){
            //  return this.$store.state.changeMoveOutFlag
            // },
        },
        mounted(){
            var self = this;
        },
        activated(){
            var self = this;
            self.$store.commit('changeAsideF');
            self.$store.commit('changeMoveT');

        },
        beforeRouteEnter (to, from, next) {
            var self = this;
            store.commit('progressBarisNo');
            store.commit('progressBarShow_');
            var time3 = setTimeout(function(){
                store.commit('progressBarisOk');
                store.commit('changeAsideF');
                store.commit('changeMoveF');
                setTimeout(()=>{
                next(vm => {
                    vm.Rlist = [
                        {path:'/home',text:'首页'},
                        {path:'/share',text:'分享心情'}
                    ]
                })
                clearTimeout(time3);
                },100)
            },0)
            // getPost(to.params.id, (err, post) => {
            //   if (err) {
            //     // display some global error message
            //     next(false)
            //   } else {
            //     next(vm => {
            //       vm.post = post
            //     })
            //   }
            // })
        },
	}
</script>
<style scoped>
	.wrapper {}
	
	.main {
		float: left;
		width: 1030px;
		/*background: rgba(255, 255, 255, 0.5);
        height: 800px;*/
		/*box-shadow: 0 0 10px #ccc;*/
	}
	.main .crumbsBox{
		background: transparent;
	}
	ul.list{
		margin-top: 20px;
	}
	ul.list li {
	    height: 130px;
	    position: relative;
	}
	ul.list li:before {
	    content: "";
	    width: 0;
	    height: 0;
	    border-style: solid;
	    border-width: 0 0 20px 30px;
	    border-color: transparent transparent transparent rgba(255, 255, 255, 0.5);
	    position: absolute;
	    left: 112px;
	    top: 46px;
	    transition: all .5s;
	}
	ul.list li:first-child .say-pic-box {
	    height: 120px;
	    position: relative;
	    top: 10px;
	}
	ul.list li:hover .say-text{
		background: #fff;
	}
	ul.list li:hover::before{
		border-color: transparent transparent transparent rgba(255, 255, 255, 1);
	}
	ul.list li:hover::after{
		background: #999;
	}
	ul.list li .say-pic-box {
	    width: 100px;
	    height: 130px;
	    background: url(../assets/img/sBg.jpg) 48px 0 repeat-y;
	    filter: Alpha(opacity=90);
	    opacity: .9;
	    margin-left: 15px;
	    float: left;
	}
	ul.list li .say-pic-box img {
		width: 100px;
		height: 100px;
	    border-radius: 50px;
	    margin-top: 5px;
	    transition: all .5s;
	}
	ul.list li:hover img{
		transform: scale(1.05);
	}
	ul.list li:first-child .say-pic-box img {
	    margin-top: 0;
	}
	ul.list li .say-text {
	    width: 850px;
	    min-height: 65px;
	    background: rgba(255, 255, 255, 0.7); 
	    display: block;
	    border-radius: 5px;
        box-shadow: 1px 1px 5px #bbb;
	    font-size: 14px;
	    color: #10200a;
	    position: absolute;
	    text-indent:25px;
	    right: 10px;
	    transform: translateY(-50%);
	    top: 40%;
	    transition: all .5s;
	}
	ul.list li:after {
	    content: "";
	    width: 10px;
	    height: 10px;
	    border-radius: 50%;
	    position: absolute;
	    left: 148px;
	    top: 38px;
	    background: #ccccce;
	    border: 2px solid #fff;
	    transition: all .5s;
	}
	ul.list li .say-text p.info {
	    width: 100%;
	    height: 100%;
	    padding:10px 100px 10px 10px;
	    box-sizing: border-box;
	}
	ul.list li .say-text p.info .date-time {
	    display: block;
	    width: 85px;
	    height: 25px;
	    line-height: 25px;
	    /*background: #ee5a5a;*/
	    border-radius: 3px;
	    text-align: center;
	    color: #ee5a5a;
	    position: absolute;
	    right: 5px;
	    bottom: 5px;
	    font-size: 14px;
	    text-indent:0;
	}
</style>