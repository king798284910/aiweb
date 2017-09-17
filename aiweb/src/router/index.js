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
            component: resolve => require(['@/components/details'], resolve),
            meta:[{path:'/home',text:'首页'},
                  {path:'/web',text:'C3/H5'}]
        },//路由到h5/c3页

        {
            path: '/itnews',
            component: resolve => require(['@/components/itnews'], resolve),
        },
        {
            path: '/itnews/:id',
            component: resolve => require(['@/components/details'], resolve),
            meta:[{path:'/home',text:'首页'},
                  {path:'/itnews',text:'it资讯'}]
        },//路由到it资讯页

        {
            path: '/notes',
            component: resolve => require(['@/components/notes'], resolve),
        },
        {
            path: '/notes/:id',
            component: resolve => require(['@/components/details'], resolve),
            meta:[{path:'/home',text:'首页'},
                  {path:'/notes',text:'心得笔记'}]
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
            path: '/operation',
            component: resolve => require(['@/components/operation'], resolve),
        },//路由到网站运营

        {
            path: '/message',
            component: resolve => require(['@/components/message'], resolve),
        },//路由到留言页

        {
            path: '/editor',
            component: resolve => require(['@/components/commen/editor'], resolve),
        },//路由到编辑页面

        {
            path: '/*',
            redirect: '/home',
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
