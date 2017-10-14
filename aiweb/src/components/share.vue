<template>
	<div class="wrapper">
		<main class='main' :class='{moveInMain:asideMoveIn,moveOutMain:!asideMoveIn}'>
			<v-crumbs :Rlist='Rlist'></v-crumbs>
			<ul class='list'>
				<li class="list-li clearfix" v-for='item in listData'>
     				<div class="say-pic-box">
		               <img :src="item.imgUrl">
		            </div>
		            <div class="say-text" v-scrollmove>
		               	<p class="info">
		               		{{item.content}}
		                 	<span class="date-time">
		                 		[{{item.editDate}}]
		                 	</span> 
		                </p>
		            </div>
     			</li>
			</ul>
            <v-page @pPage='getPost' :all='all' :pCur='page' :imgflag='imgflag'></v-page>
		</main>
	</div>
</template>

<script>
    import store from '../vuex';
    import vCrumbs from './commen/crumbs.vue';
    import vPage from './commen/pageBar.vue';
    import axios from 'axios';
	export default {
		name: 'share',
		data() {
			return {
				Rlist:[],
				page:1,
                all:1,
                imgflag:false,
                listData:[],
			}
		},
        components:{
            vCrumbs,
            vPage
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
            // store.commit('progressBarisNo');
            // store.commit('progressBarShow_');
            let page = store.state.sharePage;
            axios.get('/api/getshare',{
                params:{
                    page:page,
                    limit:20,
                }
            })
            .then(function(res){
                store.commit('progressBarisOk');
                store.commit('changeAsideF');
                store.commit('changeMoveF');
                next(vm => {
                    vm.Rlist = [
                        {path:'/home',text:'首页'},
                        {path:'/share',text:'分享心情'}
                    ]
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
                self.$store.commit('changePage',{obj:'sharePage',page:page});
                self.page = page;
                self.imgflag = true;

                axios.get('/api/getshare',{
                    params:{
                        page:page,
                        limit:20,
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
		background: #e9f3e9;
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
	/*ul.list li:hover img{
		transform: rotateZ(360deg);
	}*/
	ul.list li:first-child .say-pic-box img {
	    margin-top: 0;
	}
	ul.list li .say-text {
	    width: 850px;
	    background: rgba(255, 255, 255, 0.5); 
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
	    padding:15px;
	    box-sizing: border-box;

	}
	ul.list li .say-text p.info .date-time {
	    
	    height: 25px;
	    line-height: 25px;
        padding-left: 20px;
	    color: #ee5a5a;
	    font-size: 14px;
        white-space: nowrap;
	}
</style>