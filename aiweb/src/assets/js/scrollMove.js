import Vue from 'vue'


export default {

    install (Vue, options) {
        var moveDom = [];
        Vue.directive('scrollmove', function (el) {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if(el.offsetTop  + el.offsetHeight>=scrollTop && el.offsetTop  + el.offsetHeight<=scrollTop + document.documentElement.clientHeight){
                el.classList.add("move");
            }
            window.onscroll = moveDomfn;
            var flag = true;
            for (var i = 0; i < moveDom.length; i++) {
                if(moveDom[i]===el){
                    flag = false;
                    break;
                }
            }
            if(flag){
                moveDom.push(el);
            }
            function moveDomfn() {
                //为了保证兼容性，这里取两个值，哪个有值取哪一个　　
                //scrollTop就是触发滚轮事件时滚轮的高度
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                for (var i = 0; i < moveDom.length; i++) {
                    if(moveDom[i].offsetParent!=null && moveDom[i].offsetParent.nodeName!='MAIN'){
                        if(moveDom[i].offsetTop  + moveDom[i].offsetHeight + 30 >=scrollTop && moveDom[i].offsetTop + 30 <=scrollTop + document.documentElement.clientHeight){
                            moveDom[i].classList.add("move");
                        }else{
                            moveDom[i].classList.remove("move");
                        }
                    }else{
                        if(moveDom[i].offsetTop  + moveDom[i].offsetHeight + 235 >=scrollTop && moveDom[i].offsetTop  + 235<=scrollTop + document.documentElement.clientHeight){
                            moveDom[i].classList.add("move");
                        }else{
                            moveDom[i].classList.remove("move");
                        }
                    }
                }
            }
        })
    }
}