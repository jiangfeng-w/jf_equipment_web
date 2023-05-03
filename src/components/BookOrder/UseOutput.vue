<template>
    <el-dialog
        title="提交使用成果"
        width="45%"
        class="addDialog"
        @open="assignData()"
        @closed="closeDialog()"
        align-center
        draggable
        destroy-on-close
    >
        <div class="container">
            <div class="form">
                <el-form
                    ref="formDataRef"
                    :model="formData"
                    :rules="formDataRules"
                    @keyup.enter="submitConfirm()"
                >
                    <!-- 预约编号 -->
                    <el-form-item label="预约编号">
                        <el-input
                            disabled
                            v-model="formData.id"
                        ></el-input>
                    </el-form-item>
                    <!-- 预约设备 -->
                    <el-form-item label="设备名称">
                        <el-input
                            disabled
                            v-model="formData.name"
                        ></el-input>
                    </el-form-item>
                    <!-- 使用成果 -->
                    <el-form-item
                        label="使用成果"
                        prop="use_results"
                    >
                        <el-input
                            type="textarea"
                            :rows="3"
                            :autosize="{ minRows: 3, maxRows: 6 }"
                            placeholder="请输入设备使用成果"
                            v-model="formData.use_results"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <template #footer>
            <div class="dialog-footer">
                <el-button
                    type="primary"
                    @click="submitConfirm()"
                >
                    提交
                </el-button>
                <el-button @click="closeDialog()">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import axios from 'axios'
    import loseFocus from '@/util/loseFocus'
    import uploadFile from '@/util/uploadFile'

    const props = defineProps({
        applicationBook: Object,
    })
    const assignData = () => {
        Object.assign(formData, props.applicationBook)
        // console.log(formData)
    }

    // 表单
    const formDataRef = ref()
    const formData = reactive({
        use_results: '',
    })
    // 验证规则
    const formDataRules = reactive({
        use_results: [{ required: true, message: '请输入设备使用成果', trigger: 'blur' }],
    })

    // 注册emit
    const emit = defineEmits(['closeDialog', 'getTableList'])

    // 关闭对话框
    const closeDialog = () => {
        formDataRef.value.resetFields()
        emit('closeDialog')
    }
    // 提交
    const submitConfirm = () => {
        loseFocus()
        formDataRef.value.validate(async isValid => {
            if (isValid) {
                // console.log(formData)
                try {
                    const res = await axios.post('/web/book/useOutput', formData)
                    if (res.status === 201) {
                        ElMessage.success(res.data.message)
                        closeDialog()
                        emit('getTableList')
                    }
                } catch (error) {
                    ElMessage.error(error.response.data.error)
                }
            }
        })
    }
</script>
<style lang="scss" scoped>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .image {
        display: flex;
        margin-bottom: 20px;
        img {
            max-width: 400px;
            max-height: 255px;
        }
    }

    .form {
        width: 100%;
    }
    :deep(.el-form-item__label) {
        width: 80px;
    }
</style>
