<template>
    <el-dialog
        title="重置密码"
        width="35%"
        @open="fillInInfo()"
        @closed="closeDialog()"
        align-center
        draggable
        destroy-on-close
    >
        <el-form
            ref="resetPassFormRef"
            :model="resetPass"
            :rules="resetPassFules"
        >
            <!-- 学工号 -->
            <el-form-item
                label="学工号"
                prop="number"
            >
                <el-input
                    v-model.number="resetPass.number"
                    placeholder="请输入学工号"
                />
            </el-form-item>
            <!-- 选择角色 -->
            <el-form-item
                label="选择角色"
                prop="role"
            >
                <el-radio-group v-model="resetPass.role">
                    <el-radio
                        :label="1"
                        border
                    >
                        系统管理员
                    </el-radio>
                    <el-radio
                        :label="2"
                        border
                    >
                        设备管理员
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item
                label="电子邮箱"
                prop="email"
            >
                <el-input
                    v-model="resetPass.email"
                    placeholder="请输入邮箱"
                />
            </el-form-item>
            <!-- 验证码 -->
            <el-form-item
                label="验证码"
                prop="authCode"
                class="authCode"
            >
                <el-input
                    style="width: 80%"
                    v-model="resetPass.authCode"
                    placeholder="请输入验证码"
                >
                    <el-button>你伽马</el-button>
                </el-input>
                <el-button
                    type="primary"
                    class="sendEmail"
                    @click="sendEmail(emailRef)"
                    :disabled="disabled"
                >
                    {{ sendEmailText }}
                </el-button>
            </el-form-item>

            <!-- 新密码 -->
            <el-form-item
                label="新密码"
                prop="newPassword"
            >
                <el-input
                    v-model="resetPass.newPassword"
                    type="password"
                    show-password
                    placeholder="请输入新密码"
                />
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item
                label="确认密码"
                prop="checkPass"
            >
                <el-input
                    v-model="resetPass.checkPass"
                    type="password"
                    show-password
                    placeholder="请确认新密码"
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button
                    type="primary"
                    @click="submitConfirm()"
                    :disabled="disabled2"
                >
                    确认
                </el-button>
                <el-button @click="closeDialog()">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script setup>
    import { reactive, ref, watch } from 'vue'
    import axios from 'axios'
    import loseFocus from '@/util/loseFocus'
    import { useRouter } from 'vue-router'

    const props = defineProps({
        number: String,
        role: Number,
        email: String,
    })

    // 打开对话框就填写信息
    const fillInInfo = async () => {
        if (props.number) {
            resetPass.number = Number(props.number)
            resetPass.role = props.role
            resetPass.email = props.email
        } else {
            resetPass.number = ''
            resetPass.role = ''
            resetPass.email = ''
        }
    }

    // 注册emit
    const emit = defineEmits(['closeDialog'])

    // 表单
    const resetPassFormRef = ref()
    const resetPass = reactive({
        // number: Number(props.number),
        // email: '',
        // role: '',
        authCode: '',
        newPassword: '',
        checkPass: '',
    })
    // 验证规则
    const resetPassFules = reactive({
        // 学工号
        number: [
            { required: true, message: '请输入学工号', trigger: 'blur' },
            {
                validator: (rule, value, callback) => {
                    if (typeof value !== 'number') {
                        callback(new Error('学号必须为数字'))
                    } else if (value.toString().length !== 12) {
                        callback(new Error('学号长度为12位'))
                    }
                    callback()
                },
                trigger: 'blur',
            },
        ],
        email: [
            { required: true, message: '请输入验邮箱', trigger: 'blur' },
            {
                validator: (rule, value, callback) => {
                    const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                    if (!emailRegex.test(value)) {
                        callback(new Error('请输入正确的邮箱地址'))
                    }
                    callback()
                },
                trigger: 'blur',
            },
        ],
        role: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        authCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur' },
        ],
        newPassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
                validator: (rule, value, callback) => {
                    const reg = /^.{6,16}$/
                    if (!reg.test(value)) {
                        callback(new Error('密码长度在6到16位之间'))
                    } else if (resetPass.checkPass !== '') {
                        if (!resetPassFormRef.value) return
                        resetPassFormRef.value.validateField('checkPass', () => null)
                    }
                    callback()
                },
                trigger: 'blur',
            },
        ],
        checkPass: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            {
                validator: (rule, value, callback) => {
                    if (value !== resetPass.newPassword) {
                        callback(new Error('两次密码输入不一致'))
                    } else {
                        callback()
                    }
                },
                trigger: 'blur',
            },
        ],
    })

    // 检测学工号长度
    watch(
        () => resetPass.number,
        (newValue, oldValue) => {
            if (resetPass.number && resetPass.number.toString().length >= 13) {
                resetPass.number = oldValue
            }
        }
    )
    // 检测验证码长度
    watch(
        () => resetPass.authCode,
        (newValue, oldValue) => {
            if (resetPass.authCode && resetPass.authCode.length >= 7) {
                resetPass.authCode = oldValue
            }
        }
    )

    // 发送按钮是否禁用
    const disabled = ref(false)
    // 发送按钮的文字
    const sendEmailText = ref('发送')
    // 倒计时
    const count = ref(60)
    let interval
    // 60秒倒计时
    const countDown = () => {
        let count1 = count.value
        sendEmailText.value = count1
        disabled.value = true
        interval = setInterval(() => {
            if (count1 > 1) {
                count1--
                sendEmailText.value = count1
            } else {
                sendEmailText.value = '发送'
                disabled.value = false
                clearInterval(interval)
            }
        }, 1000)
    }

    // 发送邮件
    const sendEmail = () => {
        loseFocus()
        // console.log(resetPassFormRef.value)
        resetPassFormRef.value.validateField(['number', 'role', 'email'], async isValid => {
            // 验证通过
            if (isValid) {
                // console.log(resetPass)
                // 开始倒计时
                countDown()

                // 发起请求，让后端发送验证码
                try {
                    const res = await axios.post('/admin/sendEmail', {
                        number: resetPass.number,
                        role: resetPass.role,
                        email: resetPass.email,
                    })
                    // console.log(res)
                    if (res.status === 201) {
                        ElMessage.success(res.data.message)
                        disabled2.value = false
                    }
                } catch (error) {
                    // console.log(error)
                    ElMessage.error(error.response.data.error)
                }
            }
        })
    }

    const router = useRouter()
    // 确认按钮是否禁用
    const disabled2 = ref(true)
    // 更改密码
    const submitConfirm = () => {
        loseFocus()
        resetPassFormRef.value.validate(async isValid => {
            if (isValid) {
                try {
                    const res = await axios.post('/admin/resetPass', resetPass)
                    if (res.status === 201) {
                        ElMessage.success(`${res.data.message}，请重新登录`)
                        closeDialog()
                        router.push('/login')
                    }
                } catch (error) {
                    ElMessage.error(error.response.data.error)
                }
            }
        })
    }

    // 关闭对话框
    const closeDialog = () => {
        // 清除计时器
        sendEmailText.value = '发送'
        disabled.value = false
        clearInterval(interval)
        resetPassFormRef.value.resetFields()
        emit('closeDialog')
    }
</script>
<style lang="scss" scoped>
    :deep(.el-form-item__label) {
        width: 80px;
    }

    :deep(.el-form-item) {
        margin-right: 0 !important;
    }
    :deep(.el-form-item__content) {
        width: 100%;
    }
    :deep(.el-select),
    :deep(.el-input_inner) {
        width: 100%;
    }
    .sendEmail {
        width: 60px;
        position: absolute;
        right: 0;
    }
</style>
