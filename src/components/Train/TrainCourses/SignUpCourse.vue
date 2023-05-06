<template>
    <el-dialog
        width="60%"
        class="addDialog"
        @open="assignData()"
        @closed="closeDialog()"
        align-center
        draggable
        destroy-on-close
    >
        <!-- 展示基础信息 -->
        <el-card shadow="never">
            <template #header>
                <div class="card-header">
                    <span>课程信息</span>
                </div>
            </template>
            <!-- 内容 -->
            <div class="container">
                <!-- 培训设备 -->
                <div class="data_item">
                    <div class="data_label">培训设备：</div>
                    <div class="data_value">{{ basicInfo.equip_name }}</div>
                </div>
                <!-- 项目名称 -->
                <el-tooltip
                    :show-after="200"
                    :hide-after="0"
                    class="box-item"
                    effect="dark"
                    :content="basicInfo.project_name"
                    placement="top"
                >
                    <div class="data_item">
                        <div class="data_label">项目名称：</div>
                        <div class="data_value">{{ basicInfo.project_name }}</div>
                    </div>
                </el-tooltip>
                <!-- 培训内容 -->
                <el-tooltip
                    :show-after="200"
                    :hide-after="0"
                    class="box-item"
                    effect="dark"
                    :content="basicInfo.train_content"
                    placement="top"
                >
                    <div class="data_item">
                        <div class="data_label">培训内容：</div>
                        <div class="data_value">{{ basicInfo.train_content || '*' }}</div>
                    </div>
                </el-tooltip>
                <!-- 培训人数 -->
                <div class="data_item">
                    <div class="data_label">培训人数：</div>
                    <div class="data_value">{{ `${basicInfo.train_total_count}（人）` }}</div>
                </div>
                <!-- 报名截止时间 -->
                <div class="data_item">
                    <div class="data_label">报名截止时间：</div>
                    <div class="data_value">{{ formatTime(basicInfo.signup_deadline) }}</div>
                </div>
                <!-- 培训时间 -->
                <div class="data_item">
                    <div class="data_label">培训时间：</div>
                    <div class="data_value">
                        {{ `${formatTime(basicInfo.train_start)} ~ ${formatTime(basicInfo.train_end)}` }}
                    </div>
                </div>
                <!-- 指导教师 -->
                <div class="data_item">
                    <div class="data_label">指导教师：</div>
                    <div class="data_value">{{ basicInfo.manager_name }}</div>
                </div>
                <!-- 培训地点 -->
                <div class="data_item">
                    <div class="data_label">培训地点：</div>
                    <div class="data_value">{{ basicInfo.train_place }}</div>
                </div>
                <!-- 联系方式 -->
                <div class="data_item">
                    <div class="data_label">联系方式：</div>
                    <div class="data_value">{{ basicInfo.manager_email }}</div>
                </div>
                <!-- 补充说明 -->
                <div class="data_item">
                    <div class="data_label">补充说明：</div>
                    <div class="data_value">{{ basicInfo.tips || '*' }}</div>
                </div>
            </div>
        </el-card>
        <!-- 填写报名表单 -->
        <el-card
            v-if="signup"
            shadow="never"
        >
            <template #header>
                <div class="card-header">
                    <span>报名信息</span>
                </div>
            </template>
            <el-form
                v-if="store.state.userInfo.email"
                :inline="true"
                ref="formDataRef"
                :model="formData"
                @keyup.enter="submitForm()"
            >
                <!-- 人员姓名 -->
                <el-form-item label="人员姓名">
                    <el-input
                        disabled
                        v-model="formData.student_name"
                    ></el-input>
                </el-form-item>
                <!-- 联系方式 -->
                <el-form-item label="联系方式">
                    <el-input
                        disabled
                        v-model="formData.student_email"
                    ></el-input>
                </el-form-item>
                <!-- 所属单位 -->
                <el-form-item label="所属单位">
                    <el-input
                        disabled
                        v-model="formData.academy"
                    ></el-input>
                </el-form-item>
                <!-- 专业年级 -->
                <el-form-item label="专业年级">
                    <el-input
                        disabled
                        v-model="majorGrade"
                    ></el-input>
                </el-form-item>
                <!-- 报名备注 -->
                <el-form-item label="报名备注">
                    <el-input
                        v-model="formData.tips"
                        placeholder="选填"
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 6 }"
                    />
                </el-form-item>
            </el-form>

            <!-- 绑定邮箱 -->
            <div
                class="bind_email"
                v-else
            >
                <a
                    href="javascript:;"
                    @click="router.push('/bindemail')"
                >
                    绑定邮箱后才能参加培训课程
                </a>
            </div>
        </el-card>
        <!-- 按钮 -->
        <template #footer>
            <div class="dialog-footer">
                <el-button
                    v-if="signup"
                    type="primary"
                    size="large"
                    @click="submitForm()"
                >
                    报名
                </el-button>
                <el-button
                    size="large"
                    @click="closeDialog()"
                >
                    关闭
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    import dayjs from 'dayjs'
    import loseFocus from '@/util/loseFocus'

    const router = useRouter()
    const store = useStore()
    const props = defineProps({
        signUpCourseDialogData: Object,
        signup: Number,
    })

    // 注册emit
    const emit = defineEmits(['closeDialog', 'getTableList', 'changeTab'])

    const assignData = () => {
        Object.assign(basicInfo, props.signUpCourseDialogData)
        Object.assign(formData, props.signUpCourseDialogData)
        formData.course_id = formData.id
        delete formData.id
        formData.course_state = formData.state
        formData.course_tips = formData.tips
        // console.log(basicInfo)
    }

    // 课程数据
    let basicInfo = reactive({})
    // 格式化时间
    const formatTime = timeStamp => {
        const formattedTime = dayjs(timeStamp).format('YYYY-MM-DD HH:mm:ss')
        return formattedTime
    }

    // 专业年级
    const majorGrade = ref(`${store.state.userInfo.grade} / ${store.state.userInfo.major}`)
    // 报名表单
    const formDataRef = ref()
    const formData = reactive({
        student_number: store.state.userInfo.number,
        student_name: store.state.userInfo.name,
        student_email: store.state.userInfo.email,
        grade: store.state.userInfo.grade,
        major: store.state.userInfo.major,
        academy: store.state.userInfo.academy,
        tips: '',
    })

    // 关闭对话框
    const closeDialog = () => {
        emit('closeDialog')
    }
    // 提交表单
    const submitForm = async () => {
        loseFocus()
        // console.log(formData)
        try {
            const res = await axios.post('/web/train/signUpCourse', formData)
            if (res.status === 201) {
                ElMessage.success(res.data.message)
                emit('closeDialog')
                emit('getTableList')
                emit('changeTab', 'myTrain')
            }
        } catch (error) {
            ElMessage.error(error.response.data.error)
        }
    }
</script>
<style lang="scss" scoped>
    .el-card {
        padding: 0;
        border: none;
        .card-header {
            font-size: 21px;
        }
    }
    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        overflow: hidden;
        .data_item {
            width: 50%;
            display: flex;
            align-items: center;
            line-height: 40px;
            .data_label {
                font-weight: bold;
                width: 100px;
                display: flex;
                justify-content: flex-end;
            }
            .data_value {
                width: 300px;
                // 设置文字超出省略号
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

    :deep(.el-form-item) {
        width: 50%;
        margin-right: 0 !important;
    }
    :deep(.el-form-item:nth-last-child(1)) {
        width: 100%;
        margin-right: 0 !important;
    }
    :deep(.el-form-item__label) {
        width: 80px;
    }
    :deep(.el-form-item__content) {
        width: 100%;
        // padding-left: 80px;
    }
    :deep(.el-select),
    :deep(.el-input_inner) {
        width: 100%;
    }
    .el-pagination {
        margin-top: 15px;
    }

    .bind_email {
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
    }
</style>
