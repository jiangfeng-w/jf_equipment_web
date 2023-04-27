<template>equipdetail</template>
<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import axios from 'axios'

    const route = useRoute()
    // 获取设备的最新数据
    const getEquipInfo = async () => {
        console.log(route.params.id)
        const res = await axios.get(`/web/equipment/equipdata/${route.params.id}`)
        console.log(res)
    }
    onMounted(() => {
        getEquipInfo()
    })
    // 设备数据
    const EquipData = reactive({})
</script>
<style lang="scss" scoped></style>
