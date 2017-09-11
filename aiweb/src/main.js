// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.config.productionTip = false;

Vue.use(Vuex);
let store = new Vuex.Store({
    state:{
        asideFlag:true,
        asideMoveFlag:true,
        //changeMoveOutFlag:false,
    },
    mutations: {
        //是否显示音乐
        changeAsideF (state) {
          state.asideFlag = false;
        },
        changeAsideT (state) {
          state.asideFlag = true;
        },
        //移动aside
        changeMoveF (state) {
          state.asideMoveFlag = false;
        },
        changeMoveT (state) {
          state.asideMoveFlag = true;
        },
        // changeMoveOutF (state) {
        //   state.changeMoveOutFlag = false;
        // },
        // changeMoveOutT (state) {
        //   state.changeMoveOutFlag = true;
        // },
    }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
