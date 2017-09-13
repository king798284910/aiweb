<template>
  <transition name="fade">
    <div class="progress-bar">
    </div>
  </transition>
</template>

<script type="text/babel">
  export default {
    data() {
      return {
        //初始值
        val: 0, 
       //每10毫秒自增幅度
        step:3,
        //到一定进度停止
        stopVal:95,
      }
    },
    mounted() {
      // 初始化后加载进度，加载到百分之多少由stopVal决定
      // this.val = this.initVal
      let step =  this.step
      let timer = setInterval(() => {
        this.val = this.val + step
        this.$el.style.width = this.val + '%'
        // 父组件数据加载完前进度条最多到stopVal的这个百分值
        if (this.val >= this.stopVal) {
          clearInterval(timer)
          return
        }
      }, 10)
    },
    computed:{
      isOk(){
        return this.$store.state.progressBarisOk
      },

    },
    watch: {
      //监听组件props变化决定是否继续加载，一般在父组件数据加载完后改变此标志位
      isOk() {
        let val = this.val
        let step =  this.step
        let timer = setInterval(() => {
          val = val + step
          this.$el.style.width = val + '%'
          // 加载到百分百完成
          if (val >= 100) {
            // 关闭定时器
            clearInterval(timer)
            // 加载完成关闭进度条
            this.$store.commit('progressBarHide');
            // 加载完成的回调
            // this.$emit('callback', 'load success')
            return
          }
        }, 10)
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
  }

  .fade-enter-active, &-leave-active {
    transition: all .3s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

</style>