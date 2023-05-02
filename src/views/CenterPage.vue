<template>
    <el-container>
        <el-header><Header></Header></el-header>
        <el-container>
            <el-aside width="200px"><Aside></Aside></el-aside>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>

<script setup>
    import Aside from '@/components/CenterPage/Aside.vue'
    import Header from '@/components/CenterPage/Header.vue'
</script>

<style scoped>
    .el-container {
        height: 100%;
    }
</style>
