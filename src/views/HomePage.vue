<template>
    <el-container>
        <el-header><Header></Header></el-header>
        <el-main><router-view></router-view></el-main>
    </el-container>
</template>
<script setup>
    import Header from '@/components/HomePage/Header.vue'
</script>
<style lang="scss" scoped>
    .el-container {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f0f2f5;
        height: 100%;
    }
    .el-header {
        width: 100vw;
        height: 60px;
        padding: 0;
        margin-bottom: 20px;
    }
    .el-main {
        width: 100vw;
        padding: 0 115px;
    }
</style>
