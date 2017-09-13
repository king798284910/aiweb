<template>
	<div class="wrapper">
		<main class='main' :class='{moveInMain:asideMoveIn,moveOutMain:!asideMoveIn}'>
			<v-crumbs :Rlist='Rlist'></v-crumbs>
		</main>
	</div>
</template>

<script>
    import store from '../vuex';
    import vCrumbs from './commen/crumbs.vue';
	export default {
		name: 'phote',
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
                setTimeout(function(){
                next(vm => {
                    vm.Rlist = [
                        {path:'/home',text:'首页'},
                        {path:'/photo',text:'相册'}
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
		width: 1030px;
		/*background: rgba(255, 255, 255, 0.5);
        height: 800px;*/
		/*box-shadow: 0 0 10px #ccc;*/
	}
	
	
</style>