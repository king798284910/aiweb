<template>
	<div class="wrapper">
		<main class='main' :class='{moveInMain:asideMoveIn,moveOutMain:!asideMoveIn}'>
			
		</main>
		
	</div>
</template>

<script>
    import vSide from './aside.vue';
	export default {
		name: 'message',
		data() {
			return {
				
			}
		},
		components:{
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
        beforeRouteLeave (to, from, next) {
            var self = this;
            //self.$store.commit('changeMoveOutT');
            //self.$store.commit('changeAsideF');
            self.$store.commit('changeMoveF');
            setTimeout(function(){
                //self.$store.commit('changeMoveOutF');
                next();
            },250);

        },
	}
</script>
<style scoped>
	@import "../assets/css/reset.css";
	.wrapper {}
	
	.main {
		float: left;
		width: 1030px;
		background: rgba(255, 255, 255, 0.5);
        height: 800px;
	}
	
	/*.aside {
		margin-top: 435px;
		float: right;
		width: 270px;
	}*/
</style>