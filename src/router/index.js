import { createRouter, createWebHashHistory } from 'vue-router'
// 顶上的进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

const routes = [
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/NotFound/NotFound.vue'),
    },
    {
        path: '/notfound',
        name: '/notfound',
        component: () => import('@/views/NotFound/NotFound.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/homepage',
        name: 'homepage',
        component: () => import('@/views/HomePage.vue'),
        children: [
            // 首页
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/Home/Home.vue'),
            },
            // 预约
            {
                path: '/equiplist',
                name: 'equiplist',
                component: () => import('@/views/BookEquip/EquipList.vue'),
            },
            // 设备信息
            {
                path: '/equipdetail/:id',
                name: 'equipdetail',
                component: () => import('@/views/BookEquip/EquipDetail.vue'),
            },
            // 培训
            {
                path: '/train',
                name: 'train',
                component: () => import('@/views/Train/Train.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    // 打开进度条
    NProgress.start()
    next()
})

router.afterEach((to, from, next) => {
    // 关闭进度条
    NProgress.done()
})

export default router
