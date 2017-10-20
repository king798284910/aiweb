<template>
	<div class="wrapper">
		<main class='main' :class='{moveInMain:asideMoveIn,moveOutMain:!asideMoveIn}'>
			<v-crumbs :Rlist='Rlist'></v-crumbs>
			<div class='articleDatail' v-for='item in detailData'>
        		<h2>{{item.title}}</h2>
        		<p class='autor'>
                    <span class='paddings textTime'>{{item.editDate}}</span>
                    <span class='paddings fenlei'>[<router-link :to="JSON.parse(item.label).Vpath" :title="JSON.parse(item.label).text"  class="fenleiA vueA" >{{JSON.parse(item.label).text}}</router-link>]</span>
                    <span class='paddings liulan'>浏览({{item.views}})</span>
                    <span class='paddings author'>{{item.author}}</span>
                </p>
        		<div class='contentBox' v-html='item.content' v-highlight></div>
        	</div>
            
            <!--高速版-->
            <div id="SOHUCS" :sid="sid"></div>
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
    import axios from 'axios';
	export default {
		name: 'details',
		data() {
			return {
                Rlist:[],
                detailData:[],
                sid:'',
			}
		},
		components:{
            vSide,
            vCrumbs
        },
        computed:{
            asideMoveIn(){
                return this.$store.state.asideMoveFlag
            },
        },
        mounted(){
            var self = this;
        },
        activated(){
            var self = this;
            
        },
        beforeRouteEnter (to, from, next) {
            // store.commit('progressBarisNo');
            // store.commit('progressBarShow_');

            axios.get('/api/getarticledetails',{
                params:{
                    id:to.params.id
                }
            })
            .then(function(res){
                store.commit('progressBarisOk');
                store.commit('changeAsideF');
                store.commit('changeMoveF');
                next(vm => {
                    vm.sid = to.params.id;
                    var title_ = '文章';
                    if(res.data.status>0){
                        vm.detailData = res.data.data
                        title_ = res.data.data[0].title
                    }
                    var  path_o = [{path:to.path,text:title_}];
                    vm.Rlist = to.meta.concat(path_o);
                    store.commit('changeAsideT');
                    store.commit('changeMoveT');
                })
            })
            .catch(function(err){
                console.log(err);

            });
        },
        beforeRouteUpdate (to, from, next) {
            var self = this;
            self.detailData = [];
            axios.get('/api/getarticledetails',{
                params:{
                    id:to.params.id
                }
            })
            .then(function(res){
                self.$store.commit('progressBarisOk');
                var title_ = '文章';
                var  path_o = [{path:to.path,text:title_}];
                self.Rlist = to.meta.concat(path_o);
                if(res.data.status>0){
                    self.detailData = res.data.data
                }
                next();
            })
            .catch(function(err){
                console.log(err);
            });
        },
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
    .contentBox{
        line-height: 26px;
    }
    
</style>