<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item
            class="first"
            :to="{ path: '/center' }"
        >
            个人中心
        </el-breadcrumb-item>
        <el-breadcrumb-item
            v-for="(crumb, index) in crumbs"
            :key="index"
        >
            {{ crumb }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script setup>
    import { useStore } from 'vuex'
    import { computed } from 'vue'

    const store = useStore()
    const crumbs = computed(() => {
        return store.state.BreadCrumb
    })
</script>

<style lang="scss" scoped>
    :deep(.first .el-breadcrumb__inner) {
        font-weight: 700 !important;
        text-decoration: none !important;
        transition: var(--el-transition-color) !important;
        color: var(--el-text-color-primary) !important;
    }
</style>
