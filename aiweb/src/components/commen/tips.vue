<template>
	<transition name="fade">
		<div v-if='pData.ifShow' class="tipsMain">
			<p>{{pData.centent}}</p>
		</div>
	</transition>
	
</template>
<script>
	export default {
        name: 'editor',
        props:{
        	pData:{
        		ifShow:false,
        		centent:'',
        	}
        },
        watch:{
        	pData:{
        		handler(){
        			if(this.pData.ifShow == true){
	    				let self = this;
		        		let timer = setTimeout(()=>{
		        			
		        			self.pData.ifShow = false;
		        			clearTimeout(timer);
		        		},2000);
	        		}
        		},deep:true
    			
        		
        	},
        	
        },
   }
</script>
<style scoped>
	.tipsMain{
		display: inline-block;
		width: 230px;
		min-height: 50px;
		padding: 22px 15px;
		box-sizing: border-box;
		text-align: center;
		color: red;
		background: rgba(255, 255, 255, 0.8);
		box-shadow: 0 0 10px #ccc;
		border-radius: 0 0 5px 5px;
		position: fixed;
		z-index: 9999;
		top: 0;
		left: 50%;
		margin-left: -115px;
		transition: all .3s;
	}
	.fade-enter-active, .fade-leave {
    	transform: translateY(0);
    	
  	}
  	.fade-enter, .fade-leave-active {
    	transform: translateY(-100%);
  	}
</style>