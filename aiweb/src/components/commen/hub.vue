<template></template>
<script>
    import store from '../../vuex';
    export default {
        beforeRouteEnter (to, from, next) {
            var self = this;
                store.commit('changeAsideF');
                store.commit('changeMoveF');
            next(vm => {
                let path_ = from.path;
                let page_ = to.params.page
                let route_ = path_.slice(0,path_.lastIndexOf('/')+1);
                
                vm.$router.replace({ path: route_+page_});
            })
            
        },
    }
</script>