<template>
	<div class="wrapper">
		<main class='main' :class='{moveInMain:asideMoveIn,moveOutMain:!asideMoveIn}'>
            <v-crumbs :Rlist='Rlist'></v-crumbs>
			<ul class='l-article'>
				<li v-for='item in listData' v-scrollmove>
                    <h2 v-scrollmove><router-link :to="JSON.parse(item.label).Vpath + '/' + item._id" class='textTitleA vueA' :title="item.title"  >{{item.title}}</router-link></h2>
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
		</main>
		<aside class='aside' :class='{moveIn:asideMoveIn,moveOut:!asideMoveIn}'>
			<v-side></v-side>
		</aside>
	</div>
</template>

<script>
    import vSide from './commen/aside.vue';
    import vCrumbs from './commen/crumbs.vue';
    import store from '../vuex';
    import vPage from './commen/pageBar.vue';
    import axios from 'axios';
	export default {
		name: 'web',
		data() {
			return {
                Rlist:[],
                page:1,
                all:1,
                imgflag:false,
                listData:[],
			}
		},
		computed:{
			asideMoveIn(){
				return this.$store.state.asideMoveFlag
			},
		},
		components:{
            vSide,
            vCrumbs,
            vPage
        },
        mounted(){
        	var self = this;
        },
        activated(){
			var self = this;
            self.$store.commit('changeAsideT');
        	self.$store.commit('changeMoveT');
        },
      	beforeRouteEnter (to, from, next) {
      		var self = this;
            let page = store.state.webPage;
      		// store.commit('progressBarisNo');
      		// store.commit('progressBarShow_');
            
            axios.get('/api/getarticle',{
                params:{
                    lable:'{"text":"C3/H5","Vpath":"/web"}',
                    page:page,
                    limit:8,
                }
            })
            .then(function(res){
                store.commit('progressBarisOk');
                store.commit('changeAsideF');
                store.commit('changeMoveF');
                next(vm => {
                    vm.Rlist = [
                        {path:'/home',text:'首页'},
                        {path:'/web',text:'C3/H5'}
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
                self.$store.commit('changePage',{obj:'webPage',page:page});
                self.page = page;
                self.imgflag = true;

                axios.get('/api/getarticle',{
                    params:{
                        lable:'{"text":"C3/H5","Vpath":"/web"}',
                        page:page,
                        limit:8,
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
	@import "../assets/css/reset.css";
	.wrapper {}

	.main {
		float: left;
		width: 745px;
		/*background: rgba(255, 255, 255, 0.5);
		height: 800px;*/
		/*box-shadow: 0 0 10px #ccc;*/
	}

	.aside {
		margin-top: 435px;
		float: right;
		width: 270px;
		/*box-shadow: 0 0 10px #ccc;
		background: rgba(255, 255, 255, 0.5);*/
	}

</style>