import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        asideFlag:false,
        asideMoveFlag:true,
        progressBarShow:true,
        progressBarisOk:false,
        homePage:1,
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
        //进度条是否显示
        progressBarShow_(state){
          state.progressBarShow = true;
        },
        progressBarHide(state){
          state.progressBarShow = false;
        },
        //进度条是否完成
        progressBarisOk(state){
          state.progressBarisOk = true;
        },
        progressBarisNo(state){
          state.progressBarisOk = false;
        },
        //分页的当前所在页数
        changePage(state,page){
          state[page.obj] = page.page;
        },
    }
});