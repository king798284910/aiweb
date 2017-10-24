<template>
  <transition name="fade">
    <div class="progress-bar" :class='{slow_:sliwF,fast_:fastF}' ref="move">
    </div>
  </transition>
</template>

<script type="text/babel">
  export default {
    data() {
      return {
        //初始值
        //val: 0, 
        //每10毫秒自增幅度
        //step:1,
        //到一定进度停止
        //stopVal:90,
        sliwF:false,
        fastF:false,
      }
    },
    mounted() {
      // 初始化后加载进度，加载到百分之多少由stopVal决定
      // this.val = this.initVal
      // let step =  this.step
      // let timer = setInterval(() => {
      //   this.val = this.val + step
      //   this.$el.style.width = this.val + '%'
      //   // 父组件数据加载完前进度条最多到stopVal的这个百分值
      //   if (this.val >= this.stopVal) {
      //     clearInterval(timer)
      //     return
      //   }
      // }, 150)
      this.sliwF = true;
    },
    computed:{
      isOk(){
        return this.$store.state.progressBarisOk
      },

    },
    watch: {
      //监听组件props变化决定是否继续加载，一般在父组件数据加载完后改变此标志位
      isOk() {
        // let val = this.val
        // let step =  this.step
        // let timer = setInterval(() => {
        //   val = val + step
        //   this.$el.style.width = val + '%'
        //   // 加载到百分百完成
        //   if (val >= 100) {
        //     // 关闭定时器
        //     clearInterval(timer)
        //     // 加载完成关闭进度条
        //     this.$store.commit('progressBarHide');
        //     // 加载完成的回调
        //     // this.$emit('callback', 'load success')
        //     return
        //   }
        // }, 10)
        var self = this;
        this.sliwF = false;
        this.fastF = true;
        this.$refs.move.addEventListener("animationend", function(){
          self.$store.commit('progressBarHide');
          this.removeEventListener('animationend',arguments.callee);
        },false);
      },
    },
  }
</script>

<style scoped>
  .progress-bar {
    position: fixed;
    top: 0;
    z-index: 9999;
    height:3px;
    width: 0;
    background-color:#fec001;
    /*background:linear-gradient(to right, rgba(254, 192, 1, 0) 0%, #fec001 50%,#fec001 100%);*/
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .3s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .slow_{
    animation:barMove 3s;
    animation-fill-mode:forwards;
  }
  @keyframes barMove {
    0%{
      width: 0;
    }
    100% {
      width: 90%;
    }
  }
  .fast_{
    animation:barMove2 .3s;
  }
  @keyframes barMove2 {
    0%{
      width: 90%;
    }
    100% {
      width: 100%;
    }
  }
</style>