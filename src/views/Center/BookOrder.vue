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
                <ExpandInfo :info="scope.row"></ExpandInfo>
            </template>
        </el-table-column>
        <!-- 预约编号 -->
        <el-table-column
            label="预约编号"
            width="120"
            prop="id"
            fixed
            sortable
        ></el-table-column>
        <!-- 设备编号 -->
        <el-table-column
            label="设备编号"
            width="120"
            prop="equip_id"
            fixed
            sortable
        >
            <template #default="scope">
                {{ scope.row.equip_id.toString().padStart(8, '0') }}
            </template>
        </el-table-column>
        <!-- 设备名称 -->
        <el-table-column
            prop="name"
            label="设备名称"
            fixed
        ></el-table-column>
        <!-- 预约人 -->
        <el-table-column
            prop="manager_name"
            label="设备负责人"
            width="120"
        ></el-table-column>
        <!-- 申请时间 -->
        <el-table-column
            prop="apply_time"
            label="申请时间"
            width="165"
            sortable
        >
            <template #default="scope">
                {{ formatTime(scope.row.apply_time) }}
            </template>
        </el-table-column>
        <!-- 预约日期 -->
        <el-table-column
            prop="book_date"
            label="预约日期"
            width="165"
            sortable
        >
            <template #default="scope">
                {{ formatDate(scope.row.book_date) }}
            </template>
        </el-table-column>
        <!-- 当前状态 -->
        <el-table-column
            label="当前状态"
            width="100"
        >
            <template #default="scope">
                <el-tag
                    :type="getType(scope.row)"
                    effect="dark"
                >
                    {{ getState(scope.row) }}
                </el-tag>
            </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
            label="操作"
            width="100"
            fixed="right"
        >
            <template #default="scope">
                <!-- 再次申请 -->
                <el-popconfirm
                    v-if="
                        scope.row.state === 2 || scope.row.state === 3 || scope.row.state === 4 || scope.row.state === 5
                    "
                    width="160"
                    confirm-button-text="是"
                    cancel-button-text="否"
                    title="跳转到设备详情页"
                    @confirm="reApply(scope.row)"
                >
                    <template #reference>
                        <el-button
                            v-if="
                                scope.row.state === 2 ||
                                scope.row.state === 3 ||
                                scope.row.state === 4 ||
                                scope.row.state === 5
                            "
                            type="primary"
                            size="small"
                            link
                            :icon="Setting"
                            @click="loseFocus()"
                        >
                            再次预约
                        </el-button>
                    </template>
                </el-popconfirm>
                <!-- 使用完成 -->
                <el-button
                    v-if="scope.row.state === 1"
                    type="primary"
                    size="small"
                    link
                    :icon="Check"
                    @click="completed(scope.row)"
                >
                    使用完成
                </el-button>
                <!-- 取消申请 -->
                <el-popconfirm
                    v-if="scope.row.state === 0"
                    width="160"
                    confirm-button-text="是"
                    cancel-button-text="否"
                    title="确认取消申请吗？"
                    @confirm="cancel(scope.row)"
                >
                    <template #reference>
                        <el-button
                            v-if="scope.row.state === 0"
                            type="primary"
                            size="small"
                            link
                            :icon="Delete"
                            @click="loseFocus()"
                        >
                            取消预约
                        </el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>

    <!-- 上传成果 -->
    <UseOutput
        v-model="applicationDialog"
        :applicationBook="applicationBook"
        @closeDialog="closeDialog"
        @getTableList="getTableList"
    ></UseOutput>
</template>
<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import { Delete, Setting, Check, Refresh } from '@element-plus/icons-vue'
    import axios from 'axios'
    import dayjs from 'dayjs'
    import loseFocus from '@/util/loseFocus'
    import ExpandInfo from '@/components/BookOrder/ExpandInfo.vue'
    import UseOutput from '@/components/BookOrder/UseOutput.vue'

    //#region 面包屑导航数据
    const route = useRoute()
    const store = useStore()
    const zhNames = route.meta.zh_name
    store.commit('changeBreadCrumb', zhNames)
    //#endregion

    const router = useRouter()
    // 获取预约列表
    const getTableList = async () => {
        let res
        if (store.state.userInfo.role === 1) {
            res = await axios.post('/web/equipment/getBookList')
        } else {
            res = await axios.post(`/web/equipment/getBookList/${store.state.userInfo.number}`)
        }

        // console.log(res.data.data)
        tableList.splice(0, tableList.length, ...res.data.data)
    }
    onMounted(() => {
        getTableList()
    })

    // 预约表格
    const tableList = reactive([])

    // 格式化时间
    const formatTime = timeStamp => {
        const formattedTime = dayjs(timeStamp).format('YYYY-MM-DD HH:mm:ss')
        return formattedTime
    }
    // 格式化日期
    const formatDate = timeStamp => {
        const formattedDate = dayjs(timeStamp).format('YYYY-MM-DD')
        return formattedDate
    }
    // 获取设备状态
    const getType = data => {
        const colors = ['warning', 'success', 'danger', '', 'info', 'info']
        return colors[data.state]
    }
    const getState = data => {
        const states = ['待审核', '已同意', '已拒绝', '已归还', '已过期', '已取消']
        return states[data.state]
    }

    //#region 订单操作
    // 再次预约——跳转到预约设备详情页
    const reApply = async data => {
        router.push({
            name: 'equipdetail',
            params: {
                id: data.equip_id,
            },
        })
    }

    // 对话框
    const applicationDialog = ref(false)
    const applicationBook = ref()
    // 关闭对话框
    const closeDialog = () => {
        applicationDialog.value = false
    }
    // 使用完成
    const completed = async data => {
        loseFocus()
        applicationBook.value = data
        applicationDialog.value = true
    }
    // 取消预约
    const cancel = async data => {
        try {
            const res = await axios.post('/web/book/cancel', { id: data.id })
            if (res.status === 200) {
                ElMessage.success(res.data.message)
                getTableList()
            }
        } catch (error) {
            ElMessage.error(error.response.data.error)
            getTableList()
        }
    }
    //#endregion
</script>
<style lang="scss" scoped></style>
