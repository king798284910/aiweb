import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        asideFlag:true,
        asideMoveFlag:true,
        progressBarShow:true,
        progressBarisOk:false
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
        progressBarShow_(state){
          state.progressBarShow = true;
        },
        progressBarHide(state){
          state.progressBarShow = false;
        },
        progressBarisOk(state){
          state.progressBarisOk = true;
        },
        progressBarisNo(state){
          state.progressBarisOk = false;
        },
    }
});