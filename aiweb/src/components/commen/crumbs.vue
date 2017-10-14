<template>
  
  <ul class="crumbsBox">
      <li>您当前的位置 :</li>
      <li v-for='(item,index) in Rlist' v-scrollmove>
        <router-link :to="item.path" class='fenleiA' :title="item.text">{{item.text}}</router-link>
      </li>
  </ul>
  
</template>

<script type="text/babel">
  export default {
    data() {
      return {
        
      }
    },
    props:{
      Rlist:{
        type:Array,
        default:[],
      }
    },
    mounted() {
    },
    computed:{
      

    },
    watch: {

    },
  }
</script>

<style scoped>
  .crumbsBox{
    height: 40px;
    background: rgba(255, 255, 255, 0.5);
    /*background: linear-gradient(to right, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);*/
    padding-left: 20px;
    font-size: 14px;
    border-radius: 3px;
  }
  .crumbsBox li {
    display: inline-block;
    position: relative;
    color: #666;
  }
  .crumbsBox li:after {
    content: "";
    position: absolute;
    width: 1px;
    height: 35%;
    top: 13px;
    transform: rotateZ(20deg);
    background-color: #999;
  }
  .crumbsBox li:first-child::after,.crumbsBox li:last-child::after{
    visibility: hidden;
  }
  .crumbsBox li a{
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding:0 8px;
  }
  
</style>