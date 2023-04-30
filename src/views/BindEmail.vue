<template>
    <div class="bind_page">
        <div class="bind">
            <h2>绑定邮箱</h2>
            <el-form
                ref="bindFormRef"
                :model="bindForm"
                :rules="bindRules"
                label-width="0"
                class="bind_form"
                @keyup.enter="submitForm()"
            >
                <!-- 邮箱 -->
                <el-form-item prop="email">
                    <el-input
                        v-model="bindForm.email"
                        placeholder="请输入邮箱"
                    />
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item prop="email_code">
                    <el-input
                        style="width: 80%"
                        v-model="bindForm.email_code"
                        placeholder="请输入验证码"
                    ></el-input>
                    <el-button
                        type="primary"
                        class="sendEmail"
                        @click="sendEmail()"
                        :disabled="disabled"
                    >
                        {{ sendEmailText }}
                    </el-button>
                </el-form-item>
                <!-- 绑定按钮 -->
                <el-form-item>
                    <el-button
                        class="submit"
                        type="primary"
                        @click="submitForm()"
                        :loading="loading"
                        :disabled="disabled2"
                    >
                        绑定
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script setup>
    import { reactive, ref, watch, onMounted } from 'vue'
    import axios from 'axios'
    import loseFocus from '@/util/loseFocus'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'

    onMounted(() => {
        ElMessage.warning('第一次登录系统需绑定邮箱')
    })

    const router = useRouter()
    const store = useStore()
    // 绑定邮箱表单
    const bindFormRef = ref()
    const bindForm = reactive({
        email: '',
        email_code: '',
    })
    // 验证规则
    const bindRules = reactive({
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
        email_code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 6, max: 6, message: '验证码长度为6位', trigger: 'blur' },
        ],
    })

    // 检测验证码长度
    watch(
        () => bindForm.email_code,
        (newValue, oldValue) => {
            if (bindForm.email_code && bindForm.email_code.length >= 7) {
                bindForm.email_code = oldValue
            }
        }
    )

    // 发送邮件按钮是否禁用
    const disabled = ref(false)
    // 发送邮件按钮的文字
    const sendEmailText = ref('发送')
    // 绑定按钮loading效果
    const loading = ref(false)
    // 绑定按钮是否禁用
    const disabled2 = ref(true)
    // 倒计时
    const count = ref(60)
    let interval
    // 60秒倒计时
    const countDown = () => {
        let count1 = count.value
        sendEmailText.value = `${count1}秒`
        // 禁用按钮
        disabled.value = true
        interval = setInterval(() => {
            if (count1 > 1) {
                count1--
                sendEmailText.value = `${count1}秒`
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
        bindFormRef.value.validateField(['email'], async isValid => {
            // 验证通过
            if (isValid) {
                // 开始倒计时
                countDown()
                // 发起请求，让后端发送验证码
                try {
                    const res = await axios.post('/web/sendEmail', bindForm)
                    console.log(res)
                    if (res.status === 201) {
                        ElMessage.success(res.data.message)
                        // 绑定按钮取消禁用
                        disabled2.value = false
                    }
                } catch (error) {
                    ElMessage.error(error.response.data.error)
                }
            }
        })
    }

    // 更改密码
    const submitForm = () => {
        loseFocus()
        bindFormRef.value.validate(async isValid => {
            if (isValid) {
                try {
                    const res = await axios.post('/web/student/bindEmail', bindForm)
                    if (res.status === 201) {
                        ElMessage.success('邮箱绑定成功')
                        // 存储用户信息
                        store.commit('changeUserInfo', res.data.data)
                        store.commit('changeIslogin', 1)
                        router.push('/home')
                    }
                } catch (error) {
                    ElMessage.error(error.response.data.error)
                }
            }
        })
    }
</script>
<style lang="scss" scoped>
    .bind_page {
        height: 100%;
        background-image: url('https://sso.swpu.edu.cn/linkid/api/image/download/1626424617933notloggedinbg1600900.jpg');
        background-size: cover;
        .bind {
            border-radius: 5px;
            width: 400px;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: white;
            text-align: center;
            color: #333333;
            padding: 20px;
            box-shadow: 0 0 10px rgba(1, 1, 1, 0.1);
            font-family: 'Roboto', sans-serif;
            h2 {
                font-size: 24px;
            }
            .sendEmail {
                width: 60px;
                position: absolute;
                right: 0;
                background-color: #1f2533;
                border-color: #132445;
            }
            .submit {
                width: 100%;
                background-color: #1f2533;
                border-color: #132445;
            }
            .bind_form {
                position: relative;
                margin-top: 20px;
            }
        }
    }
</style>
