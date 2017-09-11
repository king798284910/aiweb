import Vue from 'vue'
import Router from 'vue-router'
// import details from '@/components/details'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },//重定向到首页

        {
            path: '/home',
            component: resolve => require(['@/components/home'], resolve),
        },//路由到首页

        {
            path: '/web',
            component: resolve => require(['@/components/web'], resolve),
        },
        {
            path: '/web/:id',
            component: resolve => require(['@/components/details'], resolve)
        },//路由到h5/c3页

        {
            path: '/itnews',
            component: resolve => require(['@/components/itnews'], resolve),
        },
        {
            path: '/itnews/:id',
            component: resolve => require(['@/components/details'], resolve)
        },//路由到it咨询页

        {
            path: '/notes',
            component: resolve => require(['@/components/notes'], resolve),
        },
        {
            path: '/notes/:id',
            component: resolve => require(['@/components/details'], resolve)
        },//路由到心得笔记页

        {
            path: '/share',
            component: resolve => require(['@/components/share'], resolve),
        },//路由到分享页

        {
            path: '/photo',
            component: resolve => require(['@/components/photo'], resolve),
        },//路由到相册页

        {
            path: '/about',
            component: resolve => require(['@/components/about'], resolve),
        },//路由到关于我页

        {
            path: '/message',
            component: resolve => require(['@/components/message'], resolve),
        },//路由到留言页
    ],
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
    }
}
})
