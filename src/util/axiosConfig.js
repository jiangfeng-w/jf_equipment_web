import axios from 'axios'
import store from '@/store'

axios.interceptors.request.use(
    function (config) {
        // 发请求之前，获取token，传给后端
        const token = localStorage.getItem('token')
        config.headers.Authorization = `Bearer ${token}`
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    function (response) {
        // console.log(response.data)
        if (response.data.customData) {
            if (response.data.customData.code === -1) {
                localStorage.removeItem('token')
                store.commit('clearUserInfo')
                store.commit('changeIslogin', 0)
            }
        }

        const { authorization } = response.headers
        authorization && localStorage.setItem('token', authorization)

        return response
    },
    function (error) {
        return Promise.reject(error)
    }
)
