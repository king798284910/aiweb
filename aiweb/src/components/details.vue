<template>
	<div class="wrapper">
		<main class='main' :class='{moveInMain:asideMoveIn,moveOutMain:!asideMoveIn}'>
			<v-crumbs :Rlist='Rlist'></v-crumbs>
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
		name: 'web',
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
                    var title_ = '文章'
                    var  path_o = [{path:to.path,text:title_}]
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
	@import "../assets/css/reset.css";
	.wrapper {}

	.main {
		float: left;
		width: 745px;
		background: rgba(255, 255, 255, 0.5);
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