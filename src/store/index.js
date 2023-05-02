import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state: {
        // 面包屑导航
        BreadCrumb: [],
        // 是否登录
        isLogin: 0,
        // 用户信息
        userInfo: {},
    },
    getters: {},
    mutations: {
        // 设置面包屑导航的值
        changeBreadCrumb(state, value) {
            state.BreadCrumb = value
        },
        // 清空面包屑导航的值
        clearBreadCrumb(state) {
            state.BreadCrumb = []
        },
        // 修改登录状态
        changeIslogin(state, value) {
            state.isLogin = value
        },
        // 存储用户信息
        changeUserInfo(state, value) {
            Object.assign(state.userInfo, value)
        },
        // 清空用户信息
        clearUserInfo(state) {
            state.userInfo = {}
        },
    },
    actions: {},
    modules: {},
    plugins: [
        createPersistedState({
            paths: ['userInfo', 'isLogin', 'BreadCrumb'], //控制是否持久化
        }),
    ],
})
