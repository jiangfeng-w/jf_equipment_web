<template>
    <el-aside :width="'200px'">
        <p
            class="siteTitle"
            @click="goHome"
        >
            <img
                src="../../assets/logo.png"
                alt=""
            />
            <span>大精设备管理系统</span>
        </p>
        <!-- 导航菜单 -->
        <el-menu
            :router="true"
            text-color="#fff"
            :default-active="route.fullPath"
        >
            <!-- 个人信息 -->
            <el-menu-item index="/center">
                <!-- <el-icon><HomeFilled /></el-icon> -->
                <span>个人信息</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>
<script setup>
    import { HomeFilled, Management, UserFilled, TrendCharts, Menu } from '@element-plus/icons-vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useStore } from 'vuex'

    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    // 点击导航到首页
    const goHome = () => {
        router.push('/home')
    }
</script>
<style lang="scss" scoped>
    // 隐藏滚动条
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
    .el-aside {
        background-color: #304156;
        transition: 0.3s;
        .el-menu {
            background-color: #304156;
            border: #304156;
            height: 100%;
        }
        box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    }
    .siteTitle {
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
        text-align: center;
        height: 56px;
        line-height: 56px;
        background-color: #304156;
        color: #fff;
        position: sticky;
        top: 0;
        left: 0;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        span {
            margin-left: 10px;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        img {
            width: 20px;
        }
    }
    :deep(.el-sub-menu) .el-menu-item {
        background-color: #1f2d3d;
    }
    :deep(.el-menu-item):hover,
    :deep(.el-sub-menu__title):hover {
        background-color: #2d3d52;
    }
    :deep(.el-sub-menu) .el-menu-item:hover {
        background-color: #001528;
    }
</style>
