<template>
	<div class="wrapper">
		<main class='main' :class='{moveInMain:asideMoveIn,moveOutMain:!asideMoveIn}'>
			<v-crumbs :Rlist='Rlist'></v-crumbs>
            <div id="SOHUCS" sid="message"></div>
		</main>
		
	</div>
</template>

<script>
    import store from '../vuex';
    import vCrumbs from './commen/crumbs.vue';
	export default {
		name: 'message',
		data() {
			return {
				Rlist:[]
			}
		},
		components:{
            vCrumbs
        },
        computed:{
            asideMoveIn(){
                return this.$store.state.asideMoveFlag
            },
        },
        mounted(){

            var self = this;
            (function(){
                var appid = 'cyth2U5GX',
                conf = 'prod_f35b415ad2428d11aa93a874f3f98c0d';
                var doc = document,
                s = doc.createElement('script'),
                h = doc.getElementsByTagName('head')[0] || doc.head || doc.documentElement;
                s.type = 'text/javascript';
                s.charset = 'utf-8';
                s.src =  ' http://assets.changyan.sohu.com/upload/changyan.js?conf='+ conf +'&appid=' + appid;
                h.insertBefore(s,h.firstChild);
            })();
        },
        activated(){
            var self = this;
            self.$store.commit('changeAsideF');
            self.$store.commit('changeMoveT');
        },
        beforeRouteEnter (to, from, next) {
            var self = this;
            store.commit('progressBarisOk');
            store.commit('changeAsideF');
            store.commit('changeMoveF');
            next(vm => {
                vm.Rlist = [
                    {path:'/home',text:'首页'},
                    {path:'/message',text:'留言板'}
                ]
            });
        },
	}
</script>
<style scoped>
	@import "../assets/css/reset.css";
	.wrapper {}
	
	.main {
		float: left;
		width: 1030px;
		/*background: rgba(255, 255, 255, 0.5);
        height: 800px;*/
	}
	
	/*.aside {
		margin-top: 435px;
		float: right;
		width: 270px;
	}*/
</style>