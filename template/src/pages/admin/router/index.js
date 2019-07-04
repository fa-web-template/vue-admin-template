import Vue from 'vue'
import VueRouter from 'vue-router'

import { fileListToArray } from '@/common/utils/readFile'

import navList from './navList'

const routers = fileListToArray(require.context('./routers/', false, /\.js$/))

const menuRoutes = fileListToArray(
    require.context('./routers/menus/', false, /\.js$/)
)

const routerConfig = {
    // mode: process.env.NODE_ENV === 'development' ? 'history' : 'hash',
    mode: 'history',
    navList,
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            redirect: '/overview'
        },
        {
            path: '/',
            component: () => import('@/common/layouts/Home'),
            children: [
                ...routers,
                ...menuRoutes,
                {
                    path: '/404',
                    component: () => import('@/common/layouts/404'),
                    meta: {
                        title: '404'
                    }
                }
            ]
        },
        {
            path: '/login',
            component: () => import('../views/login'),
            meta: {
                title: '后台登录'
            }
        },
        {
            path: '*',
            redirect: '404'
        }
    ]
}

Vue.use(VueRouter)

const router = new VueRouter(routerConfig)

router.beforeEach(async(to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.path === '/login') {
        return next()
    }
    const store = router.app.$options.store
    const user = store.state.auth_user
    if (!user || !user.access_token) {
        next({
            path: '/login'
        })
    }
    return next()
})

export default router
