<template>
	
	<div v-if='pLayerData.ifShow' class="layerShade">
		<div class="layerMain">
			<p class='title_'>{{pLayerData.title}}</p>
			<div class='centent_'>{{pLayerData.centent}}</div>
			<div class='event_'><span @click='confirm'>确定</span><span @click='close'>取消</span></div>
			<div class='close_' @click='close'>×</div>
			
		</div>
	</div>
	
	
</template>
<script>
	export default {
        name: 'editor',
        props:{
        	pLayerData:{
        		ifShow:false,
        		title:"",
        		centent:'',
        	}
        },
        methods:{
        	close(){
        		this.pLayerData.ifShow = false;
        	},
        	confirm(){
     			this.$emit('queren');
     			this.pLayerData.ifShow = false;
        	}
        },
        
    }
</script>
<style scoped>
	.layerShade{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.layerMain{
		width: 300px;
		box-sizing: border-box;
		color: #666;
		background: rgba(255, 255, 255, 0.7);
		box-shadow: 0 0 5px rgba(0,0,0,0.2);
		border-radius:0 0 3px 3px;
		position: absolute;
		z-index: 1111;
		top: 50%;
		left: 50%;
		margin:-75px 0 0 -150px;
		animation:layerMove 0.6s ease-out;
	}
  	@keyframes layerMove {
		0%{
			transform: translateY(-50px);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}

	}
	.layerMain .title_{
		height: 40px;
		line-height: 40px;
		width: 100%;
		padding-left: 20px;
		background: rgba(255, 255, 255, 0.7);
		box-sizing: border-box;
		box-shadow: 0 1px 1px rgba(0,0,0,0.1);
	}
	.centent_{
		width: 100%;
		padding: 20px;
		text-align: center;
		box-sizing: border-box;
	}
	.event_{
		width: 100%;
		height: 30px;
		margin-bottom: 20px;
		text-align: center;
	}
	.event_ span{
		display: inline-block;
		height: 100%;
		width: 50px;
		line-height: 30px;
		cursor: pointer;
		background: rgba(255, 255, 255, 0.7);
		border-radius: 3px;
	}
	.event_ span:first-child{
		margin-right: 40px;
	}
	.event_ span:hover{
		background: rgb(239, 255, 232);
	}
	.close_{
		width: 30px;
		height: 30px;
		line-height: 36px;
		text-align: center;
		font-size: 30px;
		position: absolute;
		top: 0;
		right: 0;
		cursor: pointer;
	}
	.close_:hover{
		color: #000;
	}
</style>