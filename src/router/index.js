import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
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
        path: '/bindemail',
        name: 'bindemail',
        component: () => import('@/views/BindEmail.vue'),
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
    {
        path: '/centerpage',
        name: 'centerpage',
        component: () => import('@/views/CenterPage.vue'),
        children: [
            // 个人中心
            {
                path: '/center',
                name: 'center',
                meta: {
                    zh_name: ['个人资料'],
                },
                component: () => import('@/views/Center/Center.vue'),
            },
            // 预约管理
            {
                path: '/bookorder',
                name: 'bookorder',
                meta: {
                    zh_name: ['预约管理'],
                },
                component: () => import('@/views/Center/BookOrder.vue'),
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
    // 跳转到登录
    if (to.path === '/login') {
        next()
    } else {
        // 如果是学生且并未绑定邮箱
        if (store.state.userInfo.role === 4 && store.state.userInfo.is_bind_email === 0 && to.path !== '/bindemail') {
            next('/bindemail')
        } else {
            next()
        }
    }
})

router.afterEach((to, from, next) => {
    // 关闭进度条
    NProgress.done()
})

export default router
