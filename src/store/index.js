import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state: {
        // 是否登录
        isLogin: 0,
        // 用户信息
        userInfo: {},
    },
    getters: {},
    mutations: {
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
            paths: ['userInfo', 'isLogin'], //控制是否持久化
        }),
    ],
})
