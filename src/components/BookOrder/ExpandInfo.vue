<template>
    <div class="equipment">
        <div class="left">
            <div class="image-container">
                <img
                    :src="info.pic"
                    :alt="info.name"
                />
            </div>
        </div>
        <div class="info-container">
            <div class="name">{{ info.name }}</div>
            <ul>
                <li class="info-row">
                    <span class="info-key">预约日期：</span>
                    <span class="info-value">{{ formatDate(info.book_date) }}</span>
                </li>
                <li class="info-row">
                    <span class="info-key">设备负责人：</span>
                    <span class="info-value">{{ info.manager_name }}</span>
                </li>
                <li class="info-row">
                    <span class="info-key">联系方式：</span>
                    <span class="info-value">{{ info.manager_email }}</span>
                </li>
                <li class="info-row">
                    <span class="info-key">申请时间：</span>
                    <span class="info-value">{{ formatTime(info.apply_time) }}</span>
                </li>
                <li class="info-row">
                    <span class="info-key">审批时间：</span>
                    <span class="info-value">{{ formatTime(info.approve_time) }}</span>
                </li>
                <li class="info-row">
                    <span class="info-key">申请状态：</span>
                    <span class="info-value">
                        <el-tag
                            :type="getType(info)"
                            effect="dark"
                        >
                            {{ getState(info) }}
                        </el-tag>
                    </span>
                </li>
                <li class="info-row">
                    <span class="info-key">实验内容：</span>
                    <span class="info-value">{{ info.test_content }}</span>
                </li>
                <li
                    class="info-row"
                    v-if="info.refuse_reason"
                >
                    <span class="info-key">拒绝原因：</span>
                    <span class="info-value">{{ info.refuse_reason }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    import dayjs from 'dayjs'

    const props = defineProps({
        info: Object,
    })
    // 获取设备状态
    const getEffect = state => {
        const effects = ['light', 'plain', 'dark']
        return effects[state]
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

    // 格式化时间
    const formatTime = timeStamp => {
        if (timeStamp) {
            const formattedTime = dayjs(timeStamp).format('YYYY-MM-DD HH:mm:ss')
            return formattedTime
        } else {
            return '*'
        }
    }
    // 格式化日期
    const formatDate = timeStamp => {
        const formattedDate = dayjs(timeStamp).format('YYYY-MM-DD')
        return formattedDate
    }
</script>

<style lang="scss" scoped>
    .equipment {
        display: flex;
        align-items: flex-start;
        width: 100%;
        padding: 16px;
    }

    .left {
        display: flex;
        flex-direction: column;
        align-items: center;

        .image-container {
            margin-right: 16px;
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

    .info-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        border-bottom: 1px solid #e7eaec;
        .name {
            margin-top: -5px;
            margin-bottom: 10px;
            font-size: 25px;
            font-weight: bold;
            text-align: center;
        }
        ul {
            width: 100%;
            .info-row {
                line-height: 35px;
                list-style: none;
                display: flex;
                width: 100%;
                border-top: 1px solid #e7eaec;
                .info-key {
                    min-width: 110px;
                    font-weight: bold;
                }
                .info-value {
                    max-width: 650px;
                }
            }
        }
    }
</style>
