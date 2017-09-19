<template>
	<div class="wrapper">
		<main class='main' :class='{moveInMain:asideMoveIn,moveOutMain:!asideMoveIn}'>
			<v-crumbs :Rlist='Rlist'></v-crumbs>
			<div class='articleDatail'>
        		<h2>{{previewData.articleTitle}}</h2>
        		<p class='autor'>
                    <span class='paddings textTime'>2017-09-01 18:26:54</span>
                    <span class='paddings fenlei'>[<router-link :to="previewData.articleLabel.Vpath" :title="previewData.articleLabel.text"  class="fenleiA" >{{previewData.articleLabel.text}}</router-link>]</span>
                    <span class='paddings liulan'>浏览(666)</span>
                    <span class='paddings author'>金理学</span>
                </p>
        		<div v-html='editorContent' v-highlight></div>
        	</div>
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
	export default {
		name: 'details',
		data() {
			return {
                Rlist:[],
                previewData:{
                	articleTitle:"微博用户发布内容无版权？回应：版权归用户而非平台",
                	articleOverview:'',
                	articleImg:'',
                	articleLabel:{
                		"text":'C3/H5',
                		"Vpath":'/web'
                	},
                	id:'7981'
                },//预览的信息
                editorContent:'',
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
            store.commit('progressBarisNo');
            store.commit('progressBarShow_');
            var time3 = setTimeout(function(){
                store.commit('progressBarisOk');
                store.commit('changeAsideF');
                store.commit('changeMoveF');
                setTimeout(function(){
                next(vm => {
                    var title_ = '文章';
                    var  path_o = [{path:to.path,text:title_}];
                    vm.Rlist = to.meta.concat(path_o);
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
		width: 745px;
		/*background: rgba(255, 255, 255, 0.5);*/
        height: 800px;
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