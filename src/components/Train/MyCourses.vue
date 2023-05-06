<template>
    <!-- 表格 -->
    <el-table
        ref="tableRef"
        :data="tableList"
        style="width: 100%"
        table-layout="fixed"
        border
    >
        <!-- 展开行 -->
        <el-table-column
            type="expand"
            label="详细信息"
            width="100"
            fixed
        >
            <template #default="scope">
                <ExpandInfo :info="scope.row" />
            </template>
        </el-table-column>
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
        <!-- 当前状态 -->
        <el-table-column
            label="当前状态"
            width="100"
        >
            <template #default="scope">
                {{ getState(scope.row) }}
            </template>
        </el-table-column>
    </el-table>
</template>
<script setup>
    import { ref, reactive, onMounted, defineExpose } from 'vue'
    import { useStore } from 'vuex'
    import dayjs from 'dayjs'
    import axios from 'axios'
    import loseFocus from '@/util/loseFocus'
    import ExpandInfo from '@/components/Train/MyCourses/ExpandInfo.vue'

    const store = useStore()
    // 获取列表
    const getTableList = async equip_name => {
        const res = await axios.post(`/web/train/myCourseList`, {
            student_number: store.state.userInfo.number,
            equip_name,
        })
        tableList.splice(0, tableList.length, ...res.data.data)
        // console.log(res.data.data)
    }
    // 暴露出方法
    defineExpose({
        getTableList,
    })
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
        const states = ['报名审核中', '报名被拒', '报名通过', '正在培训', '培训完成']
        return states[data.state]
    }
</script>
<style lang="scss" scoped>
    :deep(.el-table__cell .cell) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
