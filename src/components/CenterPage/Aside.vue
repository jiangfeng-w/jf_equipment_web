<template>
    <!-- 导航菜单 -->
    <el-menu
        :router="true"
        text-color="#fff"
        :default-active="route.fullPath"
    >
        <!-- 个人信息 -->
        <el-menu-item index="/center">
            <el-icon><User /></el-icon>
            <span>个人信息</span>
        </el-menu-item>
    </el-menu>
</template>
<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import { User } from '@element-plus/icons-vue'

    const store = useStore()
    const route = useRoute()
    const router = useRouter()
</script>
<style lang="scss" scoped>
    // 隐藏滚动条
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
    .el-aside {
        background-color: #1f2533;
        transition: 0.3s;
        .el-menu {
            background-color: #1f2533;
            border: #1f2533;
            height: 100%;
        }
        box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    }

    .el-menu-item {
        margin-left: 20px;
    }
    .el-menu-item:hover {
        background-color: #253241;
    }
</style>
