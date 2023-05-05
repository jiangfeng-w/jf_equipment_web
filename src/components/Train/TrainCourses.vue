<template>
    <!-- 表格 -->
    <el-table
        ref="tableRef"
        :data="tableList"
        style="width: 100%"
        table-layout="fixed"
        border
    >
        <!-- 序号 -->
        <el-table-column
            type="index"
            label="序号"
            width="60"
            fixed
        ></el-table-column>
        <!-- 项目名称 -->
        <el-table-column
            label="项目名称"
            min-width="250"
        >
            <template #default="scope">
                <el-tooltip
                    :show-after="200"
                    :hide-after="0"
                    class="box-item"
                    effect="dark"
                    :content="scope.row.project_name"
                    placement="top-start"
                >
                    {{ scope.row.project_name }}
                </el-tooltip>
            </template>
        </el-table-column>
        <!-- 设备名称 -->
        <el-table-column
            label="设备名称"
            min-width="180"
        >
            <template #default="scope">
                <el-tooltip
                    :show-after="200"
                    :hide-after="0"
                    class="box-item"
                    effect="dark"
                    :content="scope.row.equip_name"
                    placement="top-start"
                >
                    {{ scope.row.equip_name }}
                </el-tooltip>
            </template>
        </el-table-column>
        <!-- 指导教师 -->
        <el-table-column
            prop="manager_name"
            label="指导教师"
            min-width="100"
        ></el-table-column>
        <!-- 培训人数 -->
        <el-table-column
            label="培训人数"
            width="110"
        >
            <template #default="scope">
                {{ `${scope.row.train_total_count} 人` }}
            </template>
        </el-table-column>
        <!-- 报名截止时间 -->
        <el-table-column
            label="报名截止时间"
            width="165"
        >
            <template #default="scope">
                {{ formatTime(scope.row.signup_deadline) }}
            </template>
        </el-table-column>
        <!-- 报名状态 -->
        <el-table-column
            label="报名状态"
            width="100"
        >
            <template #default="scope">
                {{ getState(scope.row) }}
            </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
            label="操作"
            width="180"
            fixed="right"
        >
            <template #default="scope">
                <!-- 报名申请 -->
                <el-button
                    type="primary"
                    size="small"
                    link
                    :icon="Plus"
                    @click="loseFocus"
                >
                    报名课程
                </el-button>
                <!-- 查看成员 -->
                <el-button
                    type="primary"
                    size="small"
                    link
                    :icon="View"
                    @click="loseFocus"
                >
                    查看课程
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import { View, Plus } from '@element-plus/icons-vue'
    import dayjs from 'dayjs'
    import axios from 'axios'
    import loseFocus from '@/util/loseFocus'

    // 获取列表
    const getTableList = async () => {
        const res = await axios.get(`/web/train/trainCourseList`)
        tableList.splice(0, tableList.length, ...res.data.data)
        // console.log(tableList)
    }
    // 表格数据
    const tableList = reactive([])
    // 获取列表
    onMounted(() => {
        getTableList()
    })

    // 格式化时间
    const formatTime = timeStamp => {
        const formattedTime = dayjs(timeStamp).format('YYYY-MM-DD HH:mm:ss')
        return formattedTime
    }
    // 获取设备状态
    const getState = data => {
        const states = ['未报名', '已截止']
        return states[data.is_full_count]
    }
</script>
<style lang="scss" scoped>
    :deep(.el-table__cell .cell) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
