<template>
    <el-row :gutter="20">
        <el-col :span="16">
            <div class="left">
                <el-card
                    shadow="never"
                    :body-style="{ padding: '10px' }"
                >
                    <template #header>
                        <div class="card-header">
                            <span class="card_title">最近预约</span>
                        </div>
                    </template>
                    <el-table
                        :data="tableList"
                        style="width: 100%"
                        table-layout="fixed"
                    >
                        <el-table-column
                            prop="apply_name"
                            label="预约人"
                            width="100"
                        ></el-table-column>
                        <el-table-column
                            label="预约时间"
                            width="165"
                        >
                            <template #default="scope">
                                {{ formatTime(scope.row.apply_time) }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="设备名称"
                        ></el-table-column>
                        <el-table-column
                            prop="manager_name"
                            label="设备负责人"
                            width="100"
                        ></el-table-column>
                        <el-table-column
                            label="当前状态"
                            width="100"
                        >
                            <template #default="scope">
                                {{ getState(scope.row.state) }}
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </div>
        </el-col>
        <el-col :span="8">
            <div class="right">
                <el-card
                    shadow="never"
                    :body-style="{ padding: '10px' }"
                >
                    <template #header>
                        <div class="card-header">
                            <span class="card_title">热门设备</span>
                        </div>
                    </template>
                    <div>
                        <ul class="rank-list">
                            <li
                                class="row_item"
                                v-for="(item, index) in rangList"
                                :key="item.device_id"
                            >
                                <span class="index">{{ index + 1 }}</span>
                                <span class="device_name">{{ item.device_name }}</span>
                                <span class="borrow_count">{{ item.borrow_count }}次</span>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </div>
        </el-col>
    </el-row>
</template>
<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'
    import dayjs from 'dayjs'

    // 获取预约列表
    const getBookList = async () => {
        const res = await axios.get(`/web/equipment/getBookList/${dayjs().startOf('day').valueOf()}`)
        // console.log(res.data.data)
        tableList.splice(0, tableList.length, ...res.data.data)
    }
    onMounted(() => {
        getBookList()
    })

    // 预约表格
    const tableList = reactive([])
    // 排行榜
    const rangList = reactive([
        {
            device_id: '1214',
            device_name: '液相色谱仪',
            borrow_count: 5,
        },
        {
            device_id: '1215',
            device_name: '质谱仪',
            borrow_count: 3,
        },
        {
            device_id: '1216',
            device_name: '红外光谱仪',
            borrow_count: 2,
        },
        {
            device_id: '1217',
            device_name: '紫外光谱仪',
            borrow_count: 7,
        },
        {
            device_id: '1218',
            device_name: '电化学工作站',
            borrow_count: 1,
        },
        {
            device_id: '1219',
            device_name: '热重分析仪',
            borrow_count: 4,
        },
        {
            device_id: '1220',
            device_name: '原子吸收光谱仪',
            borrow_count: 0,
        },
        {
            device_id: '1221',
            device_name: '电感耦合等离子体质谱仪',
            borrow_count: 6,
        },
        {
            device_id: '1222',
            device_name: '核磁共振仪',
            borrow_count: 8,
        },
        {
            device_id: '1223',
            device_name: '电子显微镜',
            borrow_count: 9,
        },
    ])

    // 格式化时间
    const formatTime = timeStamp => {
        const formattedTime = dayjs(timeStamp).format('YYYY-MM-DD HH:mm:ss')
        return formattedTime
    }
    // 计算状态
    const getState = state => {
        const states = ['待审核', '已通过', '未通过']
        return states[state]
    }
</script>
<style lang="scss" scoped>
    .el-row {
        height: 80vh;
    }
    .el-card {
        // height: 100%;
        height: 80vh;
        padding: 0;
        overflow: auto;
    }
    // #region 排行榜的样式
    .rank-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .rank-list .row_item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid #ebeef5;
    }
    .rank-list .row_item:hover {
        background-color: #f5f7fa;
    }

    .rank-list .row_item:last-child {
        border-bottom: none;
    }

    .rank-list .index {
        display: inline-block;
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        font-size: 13px;
        font-weight: bold;
        color: #fff;
        background-color: #575c57;
        border-radius: 20%;
        margin-right: 10px;
    }

    .rank-list .device_name {
        font-size: 16px;
        font-weight: bold;
        color: #333;
        margin-right: auto;
    }

    .rank-list .borrow_count {
        font-size: 14px;
        color: #666;
    }
    // #endregion
</style>
