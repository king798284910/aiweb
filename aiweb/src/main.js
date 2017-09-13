// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'

Vue.config.productionTip = false;
/* eslint-disable no-new */
var root_vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
// Vue.use(Vuex);
// let store = new Vuex.Store({
//     state:{
//         asideFlag:true,
//         asideMoveFlag:true,
//         progressBarShow:true,
//         progressBarisOk:false
//         //changeMoveOutFlag:false,
//     },
//     mutations: {
//         //是否显示音乐
//         changeAsideF (state) {
//           state.asideFlag = false;
//         },
//         changeAsideT (state) {
//           state.asideFlag = true;
//         },
//         //移动aside
//         changeMoveF (state) {
//           state.asideMoveFlag = false;
//         },
//         changeMoveT (state) {
//           state.asideMoveFlag = true;
//         },
//         progressBarShow(state){
//           state.progressBarShow = true;
//         },
//         progressBarHide(state){
//           state.progressBarShow = false;
//         },
//         progressBarisOk(state){
//           state.progressBarisOk = true;
//         },
//         progressBarisNo(state){
//           state.progressBarisOk = false;
//         },
//         // changeMoveOutF (state) {
//         //   state.changeMoveOutFlag = false;
//         // },
//         // changeMoveOutT (state) {
//         //   state.changeMoveOutFlag = true;
//         // },
//     }
// });


