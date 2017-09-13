<template>
	<div class="wrapper">
		<main class='main' :class='{moveInMain:asideMoveIn,moveOutMain:!asideMoveIn}'>
			<v-crumbs :Rlist='Rlist'></v-crumbs>
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
                        <span class='paddings fenlei'>[<router-link :to="'/web'" class="fenleiA" >H5/C3</router-link>]</span>
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
    import vSide from './commen/aside.vue';
    import store from '../vuex';
    import vCrumbs from './commen/crumbs.vue';
	export default {
		name: 'itnews',
		data() {
			return {
				Rlist:[]
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
                    vm.Rlist = [
                        {path:'/home',text:'首页'},
                        {path:'/itnews',text:'it资讯'}
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