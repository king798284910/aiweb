<template>
	<div class="wrapper">
		<main class='main' :class='{moveInMain:asideMoveIn,moveOutMain:!asideMoveIn}'>
			<v-crumbs :Rlist='Rlist'></v-crumbs>
            <ul class='l-article'>
                <li v-for='item in listData'>
                    <h2><router-link :to="JSON.parse(item.label).Vpath + '/' + item._id" class='textTitleA' :title="item.title"  >{{item.title}}</router-link></h2>
                    <router-link :to="JSON.parse(item.label).Vpath + '/' + item._id" :title="item.title" rel="bookmark" class="a-pic-link">
                        <img :src="item.imgUrl" :alt="item.title" :title="item.title" class="a-pic l">
                    </router-link>
                    <div class="a-con">
                        <p>{{item.overview}}。。。。。。</p>
                        <router-link :to="JSON.parse(item.label).Vpath + '/' + item._id" class="a-more" >阅读全文&gt;&gt;</router-link>
                    </div>
                    <p class='autor'>
                        <span class='paddings textTime'>{{item.editDate}}</span>
                        <span class='paddings fenlei'>[<router-link :to="JSON.parse(item.label).Vpath" class="fenleiA" >{{JSON.parse(item.label).text}}</router-link>]</span>
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
    import store from '../vuex';
    import vCrumbs from './commen/crumbs.vue';
    import vPage from './commen/pageBar.vue';
    import axios from 'axios';
	export default {
		name: 'operation',
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
            vSide,
            vCrumbs,
            vPage,
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
            self.$store.commit('changeAsideT');
            self.$store.commit('changeMoveT');

        },
        beforeRouteEnter (to, from, next) {
            var self = this;
            let page = store.state.operationPage;
            store.commit('progressBarisNo');
            store.commit('progressBarShow_');
            
            axios.get('/api/getarticle',{
                params:{
                    lable:'{"text":"网站运营","Vpath":"/operation"}',
                    page:page,
                    limit:1,
                }
            })
            .then(function(res){
                store.commit('progressBarisOk');
                store.commit('changeAsideF');
                store.commit('changeMoveF');
                setTimeout(()=>{
                    next(vm => {
                        vm.Rlist = [
                            {path:'/home',text:'首页'},
                            {path:'/operation',text:'网站运营'}
                        ]
                        vm.listData = res.data.listData
                        vm.all=res.data.count;
                        vm.page = page;
                    })
                },100)
            })
            .catch(function(err){
                console.log(err);

            });
        },
        methods:{
            getPost(page) {
                let self = this;
                self.$store.commit('changePage',{obj:'operationPage',page:page});
                self.page = page;
                self.imgflag = true;

                axios.get('/api/getarticle',{
                    params:{
                        lable:'{"text":"网站运营","Vpath":"/operation"}',
                        page:page,
                        limit:1,
                    }
                })
                .then(function(res){
                    self.imgflag = false;
                    self.listData = res.data.listData
                    self.all=res.data.count;
                    document.documentElement.scrollTop = document.body.scrollTop = 0;
                    console.log(res.data);
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
	}
	
	.aside {
		margin-top: 435px;
		float: right;
		width: 270px;
	}
	
</style>