<template>
    <div class="navbar">
        <div class="containner">
            <div
                class="home"
                @click="router.push('/home')"
            >
                大型设备开放共享管理平台
            </div>
            <el-menu
                :default-active="route.fullPath"
                class="el-menu"
                mode="horizontal"
                :router="true"
                background-color="#1f2533"
                active-text-color="#ffd04b"
                text-color="#fff"
            >
                <el-menu-item index="/home">首页</el-menu-item>
                <el-menu-item index="/equiplist">预约设备</el-menu-item>
                <el-menu-item
                    v-if="store.state.userInfo.role === 4"
                    index="/train"
                >
                    操作培训
                </el-menu-item>
            </el-menu>

            <!-- 右边 -->
            <div class="right">
                <!-- 下拉菜单 -->
                <div
                    class="logged"
                    v-if="store.state.isLogin === 1"
                >
                    <el-dropdown class="logged">
                        <span class="el-dropdown-link">
                            欢迎您，{{ store.state.userInfo.name }}
                            <el-avatar :src="store.state.userInfo.avatar" />
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="router.push('/center')">个人中心</el-dropdown-item>
                                <el-dropdown-item
                                    @click="logOut"
                                    divided
                                >
                                    退出登录
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div
                    class="login"
                    @click="logOut"
                    v-else
                >
                    登录
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { useStore } from 'vuex'

    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // 退出登录
    const logOut = () => {
        router.push('/login')
        localStorage.removeItem('token')
        store.commit('clearBreadCrumb')
        store.commit('clearUserInfo')
        store.commit('changeIslogin', 0)
    }
</script>
<style lang="scss" scoped>
    .navbar {
        background-color: #1f2533;
        color: #fff;
        .containner {
            padding: 0 115px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .home {
                cursor: pointer;
                display: flex;
                justify-content: flex-start;
                font-size: 18px;
                user-select: none;
                width: 220px;
            }
            .right {
                .logged {
                    color: #fff;
                    display: flex;
                    user-select: none;
                    .el-dropdown-link {
                        cursor: pointer;
                        // width: 200px;
                        display: flex;
                        align-items: center;
                        .el-avatar {
                            margin-left: 15px;
                        }
                    }
                    :deep(.el-dropdown) {
                        z-index: 999999999;
                    }
                }
                .login {
                    cursor: pointer;
                    display: flex;
                    justify-content: flex-start;
                    width: 45px;
                    user-select: none;
                }
            }
            .login:hover {
                color: #ffd04b;
            }
            .el-menu {
                border-bottom: #1f2533;
                width: 750px;
                transform: translateX(-50px);
            }
        }
    }
</style>
