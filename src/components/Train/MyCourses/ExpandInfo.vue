<template>
    <!-- 内容 -->
    <div class="container">
        <!-- 培训设备 -->
        <div class="data_item">
            <div class="data_label">培训设备：</div>
            <div class="data_value">{{ info.equip_name }}</div>
        </div>
        <!-- 项目名称 -->
        <el-tooltip
            :show-after="200"
            :hide-after="0"
            class="box-item"
            effect="dark"
            :content="info.project_name"
            placement="top"
        >
            <div class="data_item">
                <div class="data_label">项目名称：</div>
                <div class="data_value">{{ info.project_name }}</div>
            </div>
        </el-tooltip>
        <!-- 培训内容 -->
        <div class="data_item">
            <div class="data_label">培训内容：</div>
            <div class="data_value">{{ info.train_content || '*' }}</div>
        </div>
        <!-- 培训人数 -->
        <div class="data_item">
            <div class="data_label">培训人数：</div>
            <div class="data_value">{{ `${info.train_total_count}（人）` }}</div>
        </div>
        <!-- 报名截止时间 -->
        <div class="data_item">
            <div class="data_label">报名截止时间：</div>
            <div class="data_value">{{ formatTime(info.signup_deadline) }}</div>
        </div>
        <!-- 培训时间 -->
        <div class="data_item">
            <div class="data_label">培训时间：</div>
            <div class="data_value">
                {{ `${formatTime(info.train_start)} ~ ${formatTime(info.train_end)}` }}
            </div>
        </div>
        <!-- 指导教师 -->
        <div class="data_item">
            <div class="data_label">指导教师：</div>
            <div class="data_value">{{ info.manager_name }}</div>
        </div>
        <!-- 培训地点 -->
        <div class="data_item">
            <div class="data_label">培训地点：</div>
            <div class="data_value">{{ info.train_place }}</div>
        </div>
        <!-- 联系方式 -->
        <div class="data_item">
            <div class="data_label">联系方式：</div>
            <div class="data_value">{{ info.manager_email }}</div>
        </div>
        <!-- 补充说明 -->
        <div class="data_item">
            <div class="data_label">补充说明：</div>
            <div class="data_value">{{ info.course_tips || '*' }}</div>
        </div>
        <!-- 报名时间 -->
        <div class="data_item">
            <div class="data_label">报名时间：</div>
            <div class="data_value">{{ formatTime(info.create_time) }}</div>
        </div>
        <!-- 当前状态 -->
        <div class="data_item">
            <div class="data_label">当前状态：</div>
            <div class="data_value">{{ getState(info) }}</div>
        </div>
        <!-- 报名备注 -->
        <div class="data_item">
            <div class="data_label">报名备注：</div>
            <div class="data_value">{{ info.tips || '*' }}</div>
        </div>
    </div>
</template>

<script setup>
    import dayjs from 'dayjs'

    const props = defineProps({
        info: Object,
    })
    // 格式化时间
    const formatTime = timeStamp => {
        const formattedTime = dayjs(timeStamp).format('YYYY-MM-DD HH:mm:ss')
        return formattedTime
    }
    // 获取设备状态
    const getState = data => {
        const states = ['报名审核中', '报名被拒', '报名通过', '正在培训', '培训完成']
        return states[data.state]
    }
</script>
<style lang="scss" scoped>
    .container {
        display: flex;
        flex-wrap: wrap;
        // justify-content: center;
        padding: 0 50px;
        width: 100%;
        overflow: hidden;
        .data_item {
            width: 50%;
            display: flex;
            align-items: center;
            line-height: 40px;
            .data_label {
                font-weight: bold;
                width: 100px;
                display: flex;
                justify-content: flex-end;
            }
            .data_value {
                // 设置文字超出省略号
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .data_item:nth-last-child(1) {
            width: 100%;
        }
    }
</style>
