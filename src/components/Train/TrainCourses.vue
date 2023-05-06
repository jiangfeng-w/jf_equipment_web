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
                <!-- 已经报名 -->
                <el-button
                    v-if="myList.includes(scope.row.id)"
                    type="primary"
                    size="small"
                    link
                    :icon="Star"
                    @click="loseFocus"
                >
                    已经报名
                </el-button>
                <!-- 报名申请 -->
                <el-button
                    v-else
                    type="primary"
                    size="small"
                    link
                    :icon="Plus"
                    @click="signUpCourse(scope.row, 1)"
                >
                    报名课程
                </el-button>
                <!-- 查看成员 -->
                <el-button
                    type="primary"
                    size="small"
                    link
                    :icon="View"
                    @click="signUpCourse(scope.row, 0)"
                >
                    查看课程
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 报名对话框 -->
    <SignUpCourse
        v-model="signUpCourseDialog"
        :signUpCourseDialogData="signUpCourseDialogData"
        :signup="signup"
        @closeDialog="closeDialog"
        @getTableList="getTableList"
        @changeTab="changeTab"
    ></SignUpCourse>
</template>
<script setup>
    import { ref, reactive, onMounted, defineExpose } from 'vue'
    import { useStore } from 'vuex'
    import { View, Plus, Star } from '@element-plus/icons-vue'
    import dayjs from 'dayjs'
    import axios from 'axios'
    import loseFocus from '@/util/loseFocus'
    import SignUpCourse from '@/components/Train/TrainCourses/SignUpCourse.vue'

    const emits = defineEmits(['changeTab'])

    const store = useStore()
    // 获取列表
    const getTableList = async equip_name => {
        const res = await axios.post(`/web/train/trainCourseList`, {
            student_number: store.state.userInfo.number,
            equip_name,
        })
        tableList.splice(0, tableList.length, ...res.data.data)
        myList.splice(0, myList.length, ...res.data.myList)
        // console.log(tableList)
    }
    // 暴露出方法
    defineExpose({
        getTableList,
    })
    // 表格数据
    const tableList = reactive([])
    // 已经报名的课程id
    const myList = reactive([])
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
        if (data.train_total_count === data.signup_count) {
            return '已满员'
        }
        const states = ['可报名', '已截止']
        return states[data.state]
    }

    // 对话框
    const signUpCourseDialog = ref(false)
    const signUpCourseDialogData = ref()
    const signup = ref(0)
    //
    // 关闭对话框
    const closeDialog = () => {
        signUpCourseDialog.value = false
    }
    // 报名课程
    const signUpCourse = (data, isSignUp) => {
        loseFocus()
        signUpCourseDialogData.value = data
        signup.value = isSignUp
        signUpCourseDialog.value = true
    }

    // 切换标签页
    const changeTab = newActiveName => {
        emits('changeTab', newActiveName)
    }
</script>
<style lang="scss" scoped>
    :deep(.el-table__cell .cell) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
