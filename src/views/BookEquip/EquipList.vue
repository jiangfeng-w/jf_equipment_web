<template>
    <!-- 筛选搜索 -->
    <el-form
        class="searchForm"
        :inline="true"
        :model="searchForm"
        ref="searchFormRef"
        @keyup.enter="search"
    >
        <!-- 设备名称 -->
        <el-form-item label="设备名称">
            <el-input
                v-model="searchForm.name"
                placeholder="搜索设备名称"
            />
        </el-form-item>
        <!-- 功能范围 -->
        <el-form-item label="功能范围">
            <el-input
                v-model="searchForm.function_range"
                placeholder="搜索功能范围"
            />
        </el-form-item>
        <!-- 设备分类 -->
        <el-form-item label="设备分类">
            <el-select
                v-model="searchForm.classification"
                clearable
                filterable
                multiple
                placeholder="请选择设备分类"
            >
                <el-option
                    v-for="item in options.classifications"
                    :key="item"
                    :label="item"
                    :value="item"
                />
            </el-select>
        </el-form-item>
        <!-- 学科分类 -->
        <el-form-item label="学科分类">
            <el-select
                v-model="searchForm.discipline_classification"
                clearable
                filterable
                multiple
                placeholder="请选择学科分类"
            >
                <el-option
                    v-for="item in options.discipline_classifications"
                    :key="item"
                    :label="item"
                    :value="item"
                />
            </el-select>
        </el-form-item>
        <!-- 所属单位 -->
        <el-form-item label="所属单位">
            <el-select
                v-model="searchForm.unit"
                clearable
                filterable
                multiple
                placeholder="请选择所属单位"
            >
                <el-option
                    v-for="item in options.units"
                    :key="item"
                    :label="item"
                    :value="item"
                />
            </el-select>
        </el-form-item>
        <!-- 生产国家 -->
        <el-form-item label="生产国家">
            <el-select
                v-model="searchForm.country"
                clearable
                filterable
                multiple
                placeholder="请选择生产国家"
            >
                <el-option
                    v-for="item in options.countrys"
                    :key="item"
                    :label="item"
                    :value="item"
                />
            </el-select>
        </el-form-item>
        <!-- 价格区间 -->
        <el-form-item label="价格区间">
            <el-select
                v-model="searchForm.price_range"
                clearable
                filterable
                multiple
                placeholder="请选择价格区间"
            >
                <el-option
                    v-for="item in options.price_range"
                    :key="item"
                    :label="item"
                    :value="item"
                />
            </el-select>
        </el-form-item>
        <!-- 设备状态 -->
        <el-form-item label="设备状态">
            <el-select
                v-model="searchForm.state"
                clearable
                filterable
                multiple
                placeholder="请选择设备状态"
            >
                <el-option
                    v-for="item in states"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>
        </el-form-item>
        <!-- 购置时间 -->
        <el-form-item
            label="购置时间"
            class="time"
        >
            <el-date-picker
                v-model="searchForm.buy_time"
                type="daterange"
                :shortcuts="shortcuts"
                range-separator="~"
                start-placeholder="购置开始"
                end-placeholder="购置截止"
                @change="formatTimeStamp"
            />
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btn">
            <el-button
                type="primary"
                :icon="Search"
                @click="search"
            >
                搜索
            </el-button>
            <el-button
                :icon="Refresh"
                @click="resetSearchForm"
            >
                重置
            </el-button>
        </el-form-item>
    </el-form>

    <!-- 展示设备 -->
    <div class="equiplist">
        <el-row :gutter="15">
            <el-col
                :span="6"
                v-for="item in tableList"
                :key="item.id"
            >
                <EquipmentCard
                    :id="item.id"
                    :name="item.name"
                    :pic="item.pic"
                    :state="item.state"
                    :buy_time="item.buy_time"
                    :discipline_classification="item.discipline_classification"
                    :manage_classification="item.manage_classification"
                    :function_range="item.function_range"
                ></EquipmentCard>
            </el-col>
        </el-row>
    </div>

    <!-- 分页 -->
    <el-pagination
        v-if="listLength"
        v-model:current-page="searchForm.currentPage"
        v-model:page-size="searchForm.pageSize"
        :page-sizes="[8, 16, 32, 64]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listLength"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
</template>
<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import { Search, Refresh } from '@element-plus/icons-vue'
    import axios from 'axios'
    import dayjs from 'dayjs'
    import loseFocus from '@/util/loseFocus'
    import EquipmentCard from '@/components/BookEquip/EquipmentCard.vue'

    //#region 筛选搜索
    const searchFormRef = ref()
    const searchForm = reactive({
        name: '',
        function_range: '',
        classification: [],
        discipline_classification: [],
        unit: [],
        country: [],
        price_range: [],
        buy_time: [],
        state: [],
        pageSize: 8,
        currentPage: 1,
    })

    // 搜索
    const search = async () => {
        loseFocus()
        getLength()
        getTableList()
    }
    // 重置
    const resetSearchForm = () => {
        loseFocus()
        searchForm.name = ''
        searchForm.function_range = ''
        searchForm.classification = []
        searchForm.discipline_classification = []
        searchForm.unit = []
        searchForm.country = []
        searchForm.price_range = []
        searchForm.buy_time = []
        searchForm.state = []
        getLength()
        getTableList()
    }

    // 分页
    const handleSizeChange = val => {
        getLength()
        getTableList()
    }
    const handleCurrentChange = val => {
        getLength()
        getTableList()
    }
    // 获取长度
    const listLength = ref()
    // 获取列表长度
    const getLength = async () => {
        const res = await axios.post('/web/equipment/listLength', searchForm)
        listLength.value = res.data.data
    }

    //#region 选择器的数据
    // 从数据库获取数据，更改el-select的options
    const getOptions = async () => {
        const res = await axios.get('/web/equipment/options')
        if (options) {
            for (const i in res.data.data) {
                // console.log(options[i])
                options[i] = Array.from(new Set([...options[i], ...res.data.data[i]]))
                // 去掉空项
                options[i] = options[i].filter(item => item !== '')
            }
        }
    }

    // 选择器
    const options = reactive({
        // 生产国家
        countrys: [],
        // 设备分类
        classifications: [],
        // 学科分类
        discipline_classifications: [],
        // 所属单位
        units: [],
        // 价格区间
        price_range: ['10万-20万', '20万-50万', '50万-100万', '500万-1000万', '1000万以上'],
    })

    // 设备状态
    const states = [
        {
            label: '正常状态',
            value: 0,
        },
        {
            label: '维修申请状态',
            value: 1,
        },
        {
            label: '维修申请失败',
            value: 2,
        },
        {
            label: '维修中',
            value: 3,
        },
        {
            label: '报废申请状态',
            value: 4,
        },
        {
            label: '报废申请失败',
            value: 5,
        },
        {
            label: '已报废',
            value: 7,
        },
    ]
    //#endregion

    // 时间选择
    const shortcuts = [
        {
            text: '1年内',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
                return [start, end]
            },
        },
        {
            text: '1-3年',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 3)
                end.setTime(end.getTime() - 3600 * 1000 * 24 * 365 * 1)
                return [start, end]
            },
        },
        {
            text: '3-5年',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 5)
                end.setTime(end.getTime() - 3600 * 1000 * 24 * 365 * 3)
                return [start, end]
            },
        },
        {
            text: '5-7年',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 7)
                end.setTime(end.getTime() - 3600 * 1000 * 24 * 365 * 5)
                return [start, end]
            },
        },
        {
            text: '7-10年',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 10)
                end.setTime(end.getTime() - 3600 * 1000 * 24 * 365 * 7)
                return [start, end]
            },
        },
        {
            text: '10年以上',
            value: () => {
                const end = new Date()
                const start = new Date(1958, 0, 1, 0, 0, 0)
                end.setTime(end.getTime() - 3600 * 1000 * 24 * 365 * 10)
                return [start, end]
            },
        },
    ]

    //#region 选择时间后格式化
    const formatTimeStamp = value => {
        searchForm.buy_time = value.map(item => {
            return dayjs(item).valueOf()
        })
    }
    //#endregion

    //#endregion

    // 获取设备列表
    const getTableList = async () => {
        const res = await axios.post('/web/equipment/list', searchForm)
        tableList.splice(0, tableList.length, ...res.data.data)
        // console.log(tableList)
    }
    onMounted(() => {
        getLength()
        getTableList()
        getOptions()
    })
    // 设备列表
    const tableList = reactive([])
</script>
<style lang="scss" scoped>
    .searchForm {
        background-color: #fff;
        padding: 10px 0 0 10px;
        border-radius: 5px;
        margin-bottom: 20px;
    }
    :deep(.el-cascader) {
        width: 100%;
    }
    :deep(.el-form-item:not(:last-child)) {
        width: 49%;
        margin-right: 10px !important;
    }
    // 选择最后两个，按钮和时间选择器
    :deep(.el-form-item:nth-last-child(2)) {
        width: 84%;
        margin-right: 10px !important;
    }
    :deep(.el-form-item__content) {
        width: 100%;
        // padding-left: 80px;
    }
    :deep(.el-select),
    :deep(.el-input_inner) {
        width: 100%;
    }

    .btn {
        // margin-left: 30px;
        margin-right: 0;
    }
    .el-pagination {
        margin-top: 15px;
    }
</style>
