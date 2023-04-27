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
                <el-menu-item index="/train">操作培训</el-menu-item>
            </el-menu>
            <div class="login">登录</div>
        </div>
    </div>
</template>
<script setup>
    import { useRoute, useRouter } from 'vue-router'

    const route = useRoute()
    const router = useRouter()
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
                width: 300px;
            }
            .login {
                cursor: pointer;
                display: flex;
                justify-content: flex-end;
                width: 100px;
                user-select: none;
                transform: translateX(-18px);
            }
            .el-menu {
                border-bottom: #1f2533;
                width: 100%;
            }
        }
    }
</style>
