<template>
    <div class="login_page">
        <!-- 登录表单 -->
        <div class="login">
            <h2>大型设备开放共享管理平台</h2>
            <el-form
                ref="loginFormRef"
                :model="loginForm"
                :rules="loginRules"
                label-width="0"
                class="loginForm"
                @keyup.enter="submitForm()"
            >
                <!-- 用户名 -->
                <el-form-item prop="number">
                    <el-input
                        v-model.number="loginForm.number"
                        :prefix-icon="User"
                        placeholder="请输入学工号"
                    />
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input
                        v-model="loginForm.password"
                        type="password"
                        :prefix-icon="Lock"
                        placeholder="请输入密码"
                        show-password
                    />
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="submit">
                    <el-button
                        type="primary"
                        @click="submitForm()"
                        :loading="loading"
                    >
                        登录
                    </el-button>
                </el-form-item>
                <!-- 重置密码 -->
                <div
                    class="forgetPassBtn"
                    @click="showResetPass"
                >
                    忘记密码?
                </div>
            </el-form>
        </div>
        <ResetPass
            v-model="resetPassDalogVisible"
            @closeDialog="closeDialog()"
        />
    </div>
</template>

<script setup>
    import { reactive, ref, watch } from 'vue'
    import { useRouter } from 'vue-router'
    import { User, Lock } from '@element-plus/icons-vue'
    import axios from 'axios'
    import { useStore } from 'vuex'
    import loseFocus from '@/util/loseFocus.js'
    import ResetPass from '@/components/ResetPass/ResetPass.vue'

    //登录表单
    const loginForm = reactive({
        number: null,
        password: '',
    })
    // 表单绑定的响应式对象
    const loginFormRef = ref()
    // 登录表单校验规则
    const loginRules = reactive({
        // 学工号
        number: [
            { required: true, message: '请输入学工号', trigger: 'blur' },
            {
                validator: (rule, value, callback) => {
                    if (typeof value !== 'number') {
                        callback(new Error('学工号必须为数字'))
                    } else if (value.toString().length !== 12) {
                        callback(new Error('学工号长度为12位'))
                    }
                    callback()
                },
                trigger: 'blur',
            },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码至少为6位', trigger: 'blur' },
        ],
    })
    // 检测学工号长度
    watch(
        () => loginForm.number,
        (newValue, oldValue) => {
            if (loginForm.number.toString().length >= 13) {
                loginForm.number = oldValue
            }
        }
    )

    const router = useRouter()
    const store = useStore()
    const loading = ref(false)
    // 提交表单
    const submitForm = () => {
        loseFocus()
        // 表单校验
        loginFormRef.value.validate(async isValid => {
            if (isValid) {
                loading.value = true
                // console.log(loginForm)
                try {
                    const res = await axios.post('/web/user/login', loginForm)
                    // console.log(res.data)
                    if (res.status === 200) {
                        // 存储用户信息
                        store.commit('changeUserInfo', res.data.data)
                        store.commit('changeIslogin', 1)
                        router.push('/home')
                    }
                } catch (error) {
                    loading.value = false
                    ElMessage.error(error.response.data.error)
                }
            }
        })
    }

    // 忘记密码对话框
    const resetPassDalogVisible = ref(false)
    // 显示重置密码对话框
    const showResetPass = () => {
        resetPassDalogVisible.value = true
    }
    // 关闭对话框
    const closeDialog = () => {
        resetPassDalogVisible.value = false
    }
</script>

<style lang="scss" scoped>
    .login_page {
        height: 100%;
        background-image: url('https://sso.swpu.edu.cn/linkid/api/image/download/1626424617933notloggedinbg1600900.jpg');
        background-size: cover;
    }
    .login {
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
        .el-button {
            width: 100%;
            background-color: #1f2533;
            border-color: #132445;
        }
        .loginForm {
            position: relative;
            margin-top: 20px;
        }
    }
    .forgetPassBtn {
        cursor: pointer;
        display: inline-block;
        font-size: 12px;
        transform: translate(173px, -10px);
        margin-top: 10px;
    }
</style>
