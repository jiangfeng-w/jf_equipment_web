<template>
    <el-container>
        <Aside></Aside>
        <el-container direction="vertical">
            <Header></Header>
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
