<template>
    <div class="top">
        <!-- 左边 -->
        <div class="left">
            <img
                src="../../assets/logo.png"
                alt=""
            />
            <div
                class="home"
                @click="router.push('/home')"
            >
                大型设备开放共享管理平台
            </div>
            <BreadCrumb />
        </div>

        <!-- 右边 -->
        <div class="right">
            <!-- 下拉菜单 -->
            <div
                class="go_home"
                @click="goHome"
            >
                返回前台
            </div>
            <el-dropdown>
                <span class="center_dropdown">
                    欢迎您，{{ store.state.userInfo.name }}
                    <el-avatar :src="store.state.userInfo.avatar" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
    import { Fold, Expand, ArrowDown } from '@element-plus/icons-vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import BreadCrumb from '../BreadCrumb/BreadCrumb.vue'

    const store = useStore()
    const router = useRouter()
    // 返回首页
    const goHome = () => {
        router.push('/home')
    }
    // 退出登录
    const logOut = () => {
        router.push('/login')
        localStorage.removeItem('token')
        store.commit('clearBreadCrumb')
        store.commit('clearUserInfo')
        store.commit('changeIslogin', 0)
    }
</script>

<style lang="scss" scope>
    .el-header {
        display: flex;
        flex-direction: column;
        padding: 0;
        height: 60px;
        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 60px;
            box-sizing: border-box;
            padding: 0 20px;
            box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
            // background-color: aqua;
            .left {
                display: flex;
                align-items: center;
                img {
                    width: 24px;
                    transform: translateY(3px);
                    margin-right: 5px;
                }
                .home {
                    margin-right: 20px;
                    font-size: 24px;
                }
            }
            .right {
                display: flex;
                align-items: center;
                .go_home {
                    font-size: 14px;
                    cursor: pointer;
                    margin-right: 20px;
                }
                .go_home:hover {
                    color: #2d8cf0;
                }
            }
        }
    }
    .center_dropdown {
        cursor: pointer;
        display: flex;
        color: #000;
        align-items: center;
        .el-avatar {
            margin-left: 15px;
        }
    }
    :deep(.el-dropdown) {
        z-index: 999999999;
    }
</style>
