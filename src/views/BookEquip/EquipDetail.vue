<template>
    <div class="equipdetail">
        <!-- 基本信息 -->
        <el-card
            class="top"
            shadow="never"
        >
            <div class="left">
                <div class="image-container">
                    <img
                        :src="equipData.pic"
                        :alt="equipData.name"
                    />
                </div>
            </div>
            <div
                class="right"
                v-if="equipData.name"
            >
                <div class="name">{{ equipData.name }}（{{ equipData.id.toString().padStart(8, '0') }}）</div>
                <el-tag
                    class="device_status"
                    effect="dark"
                    :type="equipData.state === 0 ? 'success' : 'danger'"
                >
                    {{ equipData.state === 0 ? '可预约' : '不可预约' }}
                </el-tag>
                <ul>
                    <li class="info-row">
                        <span class="info-key">安置地点：</span>
                        <span class="info-value">{{ equipData.place }}</span>
                    </li>
                    <li class="info-row">
                        <span class="info-key">所属单位：</span>
                        <span class="info-value">{{ equipData.unit }}</span>
                    </li>
                    <li class="info-row">
                        <span class="info-key">设备负责人：</span>
                        <span class="info-value">{{ equipData.manager_name }}</span>
                    </li>
                    <li class="info-row">
                        <span class="info-key">电子邮箱：</span>
                        <span class="info-value">{{ equipData.manager_email }}</span>
                    </li>
                    <li class="info-row">
                        <span class="info-key">联系电话：</span>
                        <span class="info-value">{{ equipData.manager_phone_number }}</span>
                    </li>
                </ul>
            </div>
        </el-card>

        <!-- 预约 -->
        <el-card
            class="bottom"
            shadow="never"
        >
            <el-tabs v-model="activeName">
                <!-- 设备信息 -->
                <el-tab-pane
                    label="设备信息"
                    name="equipinfo"
                >
                    <ul v-if="equipData.name">
                        <li class="info-row">
                            <span class="info-key">设备国别：</span>
                            <span class="info-value">{{ equipData.country ? equipData.country : '*' }}</span>
                        </li>
                        <li class="info-row">
                            <span class="info-key">生产厂商：</span>
                            <span class="info-value">{{ equipData.manufacturer ? equipData.manufacturer : '*' }}</span>
                        </li>
                        <li class="info-row">
                            <span class="info-key">购置日期：</span>
                            <span class="info-value">{{ formatTime(equipData.buy_time) }}</span>
                        </li>
                        <li class="info-row">
                            <span class="info-key">设备总价：</span>
                            <span class="info-value">{{ equipData.price }}</span>
                        </li>
                        <li class="info-row">
                            <span class="info-key">设备分类：</span>
                            <span class="info-value">
                                {{ equipData.classification ? equipData.classification : '*' }}
                            </span>
                        </li>
                        <li class="info-row">
                            <span class="info-key">学科分类：</span>
                            <span class="info-value">
                                {{ equipData.discipline_classification ? equipData.discipline_classification : '*' }}
                            </span>
                        </li>
                        <li class="info-row">
                            <span class="info-key">管理分类：</span>
                            <span class="info-value">
                                {{ equipData.manage_classification ? equipData.manage_classification : '*' }}
                            </span>
                        </li>
                        <li class="info-row">
                            <span class="info-key">设备型号：</span>
                            <span class="info-value">{{ equipData.model ? equipData.model : '*' }}</span>
                        </li>
                        <li class="info-row">
                            <span class="info-key">设备规格：</span>
                            <span class="info-value">
                                {{ equipData.specification ? equipData.specification : '*' }}
                            </span>
                        </li>
                        <li class="info-row">
                            <span class="info-key">功能应用范围：</span>
                            <span class="info-value">
                                {{ equipData.function_range ? equipData.function_range : '*' }}
                            </span>
                        </li>
                        <li class="info-row">
                            <span class="info-key">主要技术指标：</span>
                            <span class="info-value">
                                {{ equipData.technical_indicators ? equipData.technical_indicators : '*' }}
                            </span>
                        </li>
                    </ul>
                </el-tab-pane>
                <!-- 预约设备 -->
                <el-tab-pane
                    label="预约设备"
                    name="bookequip"
                >
                    <!-- 未登录 -->
                    <div
                        class="please_login"
                        v-if="!store.state.isLogin"
                    >
                        <a
                            href="javascript:;"
                            @click="logOut"
                        >
                            未登录无法预约设备
                        </a>
                    </div>
                    <!-- 不可预约 -->
                    <div
                        class="cannot_book"
                        v-else-if="equipData.state !== 0"
                    >
                        <a
                            href="javascript:;"
                            @click="router.push('/equiplist')"
                        >
                            此设备目前不可预约
                        </a>
                    </div>
                    <!-- 未培训 -->
                    <div
                        class="cannot_book"
                        v-else-if="
                            store.state.userInfo.role === 4 && !trainedList.includes(store.state.userInfo.number)
                        "
                    >
                        <a
                            href="javascript:;"
                            @click="router.push('/train')"
                        >
                            培训完成后可预约设备
                        </a>
                    </div>
                    <!-- 预约表单 -->
                    <div
                        class="book_form"
                        v-else
                    >
                        <BookCalendar
                            @selectDate="selectDate"
                            :current_select="current_select"
                            :equipBook="equipBook"
                        ></BookCalendar>
                        <el-form
                            :inline="true"
                            ref="bookFormRef"
                            :model="bookForm"
                            :rules="bookFormRules"
                        >
                            <el-form-item
                                label="实验内容"
                                prop="test_content"
                                class="textarea"
                            >
                                <el-input
                                    v-model="bookForm.test_content"
                                    type="textarea"
                                    autosize
                                ></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-button
                                    type="primary"
                                    @click="submitBookForm()"
                                >
                                    确认预约
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import axios from 'axios'
    import dayjs from 'dayjs'
    import loseFocus from '@/util/loseFocus'
    import BookCalendar from '@/components/BookEquip/BookCalendar.vue'

    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // 退出登录
    const logOut = () => {
        router.push('/login')
        localStorage.removeItem('token')
        store.commit('clearUserInfo')
        store.commit('changeIslogin', 0)
    }

    // 获取设备的最新数据
    const getEquipInfo = async () => {
        const res = await axios.get(`/web/equipment/equipdata/${route.params.id}`)
        Object.assign(equipData, res.data.data)
        bookForm.equip_id = equipData.id
        bookForm.name = equipData.name
        bookForm.pic = equipData.pic
        bookForm.apply_number = store.state.userInfo.number
        bookForm.apply_name = store.state.userInfo.name
        bookForm.apply_email = store.state.userInfo.email
        bookForm.role = store.state.userInfo.role
        bookForm.manager_number = equipData.manager_number
        bookForm.manager_name = equipData.manager_name
        bookForm.manager_email = equipData.manager_email

        // console.log(equipData)
    }
    // 获取设备的预约情况
    const getEquipBook = async () => {
        const res = await axios.get(`/web/equipment/book/${route.params.id}`)
        // console.log(res.data.data)
        if (res.data.data[0]) {
            current_select.value = res.data.data[0].book_date
        }
        // 被其他人预约的
        const arr2 = res.data.data
            .filter(item => {
                return item.apply_number !== store.state.userInfo.number
            })
            .map(item => {
                return (item = item.book_date)
            })
        if (arr2[0]) {
            equipBook.splice(0, equipBook.length, ...arr2)
        }
        // console.log(equipBook)
        // 获取已经培训过此设备的学生
        trainedList.splice(0, trainedList.length, ...res.data.trainedList)
        // console.log(trainedList)
    }

    onMounted(() => {
        getEquipInfo()
        if (store.state.isLogin) {
            getEquipBook()
        }
    })
    // 设备数据
    const equipData = reactive({})
    // 此设备培训过的学生
    const trainedList = reactive([])
    // 预约情况
    const equipBook = reactive([])
    // 标签页绑定
    const activeName = ref('equipinfo')
    // 格式化时间
    const formatTime = timeStamp => {
        const formattedTime = dayjs(Number(timeStamp)).format('YYYY-MM-DD')
        return formattedTime
    }

    //#region 预约标签页
    // 预约表单
    const bookFormRef = ref()
    // 已经被自己选择的
    const current_select = ref()
    const bookForm = reactive({
        test_content: '',
        book_date: null,
    })
    // 校验规则
    const bookFormRules = reactive({
        test_content: [
            { required: true, message: '请输入实验内容', trigger: 'blur' },
            { min: 30, message: '实验内容至少30个字', trigger: 'blur' },
        ],
    })
    // 日期组件选择日期
    const selectDate = date => {
        date ? (bookForm.book_date = dayjs(date).valueOf()) : (bookForm.book_date = date)
    }
    // 提交预约表单
    const submitBookForm = () => {
        loseFocus()
        // 自己已经预约
        if (current_select.value) {
            ElMessage.warning('您已预约此设备其他时段')
            return
        }
        bookFormRef.value.validate(async isValid => {
            if (isValid) {
                if (bookForm.book_date === null) {
                    ElMessage.warning('请选择预约日期')
                } else {
                    // console.log(bookForm)
                    try {
                        const res = await axios.post('/web/equipment/book', bookForm)
                        if (res.status === 201) {
                            ElMessage.success(res.data.message)
                            router.push('/equiplist')
                        }
                    } catch (error) {
                        ElMessage.error(error.response.data.error)
                    }
                }
            }
        })
    }
    //#endregion
</script>
<style lang="scss" scoped>
    //#region 上面样式
    :deep(.top .el-card__body) {
        display: flex;
        align-items: flex-start;
        width: 100%;
        color: #606266;
    }
    .top {
        margin-bottom: 20px;
        .left {
            display: flex;
            flex-direction: column;
            align-items: center;
            .image-container {
                // margin-right: 16px;
                width: 400px;
                height: 255px;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px dashed #dbdbdb;
                img {
                    max-width: 400px;
                    max-height: 255px;
                }
            }
        }
        .right {
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            .name {
                margin-top: -5px;
                margin-bottom: 10px;
                font-size: 26px;
                font-weight: bold;
                text-align: center;
            }
            ul {
                .info-row {
                    font-size: 14px;
                    line-height: 42px;
                    list-style: none;
                    display: flex;
                    width: 100%;
                    .info-key {
                        min-width: 90px;
                        font-weight: bold;
                    }
                    .info-value {
                        max-width: 650px;
                    }
                }
            }
        }
    }
    //#endregion

    //#region 下面样式
    .bottom {
        ul {
            .info-row {
                font-size: 14px;
                line-height: 35px;
                list-style: none;
                display: flex;
                width: 100%;
                .info-key {
                    display: flex;
                    justify-content: flex-end;
                    min-width: 110px;
                    font-weight: bold;
                }
            }
        }
    }
    //#endregion

    //#region 预约设备
    .book_form {
        display: flex;
        flex-direction: column;
    }
    :deep(.el-form-item) {
        width: 100%;
    }
    .textarea {
        :deep(.el-textarea__inner) {
            max-height: 150px !important;
            line-height: 2 !important;
        }
        width: 100%;
    }
    //#endregion

    .please_login {
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
    }
    .cannot_book {
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
    }
</style>
