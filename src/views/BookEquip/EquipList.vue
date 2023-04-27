<template>
    <div class="equiplist">
        <el-row :gutter="15">
            <el-col
                :span="6"
                v-for="item in tableList"
                :key="item.id"
            >
                <EquipmentCard
                    :id="item.id"
                    :name="item.name"
                    :pic="item.pic"
                    :state="item.state"
                    :buy_time="item.buy_time"
                    :discipline_classification="item.discipline_classification"
                    :manage_classification="item.manage_classification"
                    :function_range="item.function_range"
                ></EquipmentCard>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import axios from 'axios'
    import EquipmentCard from '@/components/BookEquip/EquipmentCard.vue'

    // 获取设备列表
    const getTableList = async () => {
        const res = await axios.post('/web/equipment/list')
        tableList.splice(0, tableList.length, ...res.data.data)
        // console.log(tableList)
    }
    onMounted(() => {
        getTableList()
    })
    // 设备列表
    const tableList = reactive([])
</script>
<style lang="scss" scoped></style>
