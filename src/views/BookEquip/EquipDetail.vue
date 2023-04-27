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
            <div class="right">
                <div class="name">{{ equipData.name }}</div>
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
                <el-tab-pane
                    label="设备信息"
                    name="equipinfo"
                >
                    <ul v-if="equipData.country">
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
                <el-tab-pane
                    label="预约设备"
                    name="bookequip"
                >
                    预约设备
                </el-tab-pane>
                <el-tab-pane
                    label="服务评论"
                    name="servicecomments"
                >
                    服务评论
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import { useRoute } from 'vue-router'
    import axios from 'axios'
    import dayjs from 'dayjs'

    const route = useRoute()
    // 获取设备的最新数据
    const getEquipInfo = async () => {
        const res = await axios.get(`/web/equipment/equipdata/${route.params.id}`)
        Object.assign(equipData, res.data.data)
        // console.log(equipData)
    }

    onMounted(() => {
        getEquipInfo()
    })
    // 设备数据
    const equipData = reactive({})

    // 标签页绑定
    const activeName = ref('equipinfo')
    // 格式化时间
    const formatTime = timeStamp => {
        const formattedTime = dayjs(Number(timeStamp)).format('YYYY-MM-DD')
        return formattedTime
    }
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
    //#endregioin
</style>
