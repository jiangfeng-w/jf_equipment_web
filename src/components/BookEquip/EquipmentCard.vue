<template>
    <el-card
        @click="goToBookEquip()"
        class="device_card"
        shadow="hover"
    >
        <div class="device_header">
            <el-tooltip
                class="box-item"
                effect="dark"
                :content="`${name}（${id.toString().padStart(8, '0')}）`"
                placement="top"
            >
                <div class="device_name">{{ name }}（{{ id.toString().padStart(8, '0') }}）</div>
            </el-tooltip>
            <div class="img_container">
                <img
                    :src="pic"
                    class="device_image"
                />
            </div>
            <el-tag
                class="device_status"
                effect="dark"
                :type="state === 0 ? 'success' : 'danger'"
            >
                {{ state === 0 ? '可预约' : '不可预约' }}
            </el-tag>
        </div>
        <ul class="device_info">
            <li class="device_info_item">
                <span class="info_key">购置日期：</span>
                <span class="info_value">{{ formatTime(buy_time) }}</span>
            </li>
            <li class="device_info_item">
                <span class="info_key">学科分类：</span>
                <span class="info_value">{{ discipline_classification }}</span>
            </li>
            <li class="device_info_item">
                <span class="info_key">管理分类：</span>
                <span class="info_value">{{ manage_classification }}</span>
            </li>
            <li class="device_info_item">
                <span class="info_key">功能范围：</span>
                <span class="info_value">{{ function_range }}</span>
            </li>
        </ul>
    </el-card>
</template>
<script setup>
    import { useRouter } from 'vue-router'
    import dayjs from 'dayjs'

    const props = defineProps({
        id: Number,
        name: String,
        pic: String,
        state: Number,
        buy_time: [Number, String],
        discipline_classification: String,
        manage_classification: String,
        function_range: String,
    })

    // 格式化时间
    const formatTime = timeStamp => {
        const formattedTime = dayjs(Number(timeStamp)).format('YYYY-MM-DD')
        return formattedTime
    }

    const router = useRouter()
    // 预约设备详情页
    const goToBookEquip = () => {
        router.push({
            name: 'equipdetail',
            params: { id: props.id },
        })
    }
</script>
<style lang="scss" scoped>
    .device_card {
        width: 300px;
        cursor: pointer;
        display: flex;
        margin-bottom: 12px;
        flex-direction: column;
        // width: 24%;
        .device_header {
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;
            .device_name {
                font-weight: bold;
                margin-bottom: 10px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .device_image {
                width: 100%;
                height: 200px;
                object-fit: cover;
                margin-bottom: 10px;
            }
            .device_status {
                margin-right: auto;
            }
        }
    }

    .device_info {
        list-style: none;
        margin: 0;
        padding: 0;
        .device_info_item {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 14px;
            margin-bottom: 10px;
            .info_value {
                color: #545353;
            }
        }
    }
</style>
