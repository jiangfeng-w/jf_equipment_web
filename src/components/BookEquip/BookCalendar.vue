<template>
    <div>
        <el-calendar ref="calendar">
            <template #header="{ date }">
                <div class="header">
                    <div class="left">
                        <span>
                            {{
                                `可预约时间：${dayjs(start_time).format('YYYY-MM-DD')} ~ ${dayjs(over_time).format(
                                    'YYYY-MM-DD'
                                )} `
                            }}
                        </span>
                    </div>
                    <div class="right">
                        <div class="tags">
                            <el-tag
                                v-if="current_select"
                                effect="dark"
                            >
                                自己预约
                            </el-tag>
                            <el-tag
                                v-else
                                effect="dark"
                                type="success"
                            >
                                当前选择
                            </el-tag>
                            <el-tag
                                effect="dark"
                                type="warning"
                            >
                                别人预约
                            </el-tag>
                            <el-tag
                                effect="dark"
                                type="info"
                            >
                                不可预约
                            </el-tag>
                        </div>
                        <el-button-group class="btns">
                            <el-button
                                size="small"
                                @click="selectRange('prev-month')"
                            >
                                上个月
                            </el-button>
                            <el-button
                                size="small"
                                @click="selectRange('today')"
                            >
                                回到本月
                            </el-button>
                            <el-button
                                size="small"
                                @click="selectRange('next-month')"
                            >
                                下个月
                            </el-button>
                        </el-button-group>
                    </div>
                </div>
            </template>

            <template #date-cell="{ data }">
                <div
                    @click="handleChange(data)"
                    class="current_day"
                    :class="changeClass(data)"
                >
                    {{ data.day }}
                </div>
            </template>
        </el-calendar>
    </div>
</template>

<script setup>
    import { ref, reactive } from 'vue'
    import dayjs from 'dayjs'
    import loseFocus from '@/util/loseFocus'

    const props = defineProps({
        current_select: Number,
        equipBook: Array,
    })

    const emits = defineEmits(['selectDate'])
    const selectDay = ref()
    // 选择事件
    const handleChange = data => {
        // 自己已经预约
        if (props.current_select && event.target.className.includes('can_select')) {
            ElMessage.warning('您已预约此设备其他时段')
            return
        }
        if (event.target.className.includes('can_select')) {
            // 选择
            // 触发事件把选中的日期传出去
            emits('selectDate', data.day)
            selectDay.value = dayjs(data.day).valueOf()
        } else if (event.target.className.includes('selected')) {
            // 取消选择
            // 触发事件把选中的日期传出去
            emits('selectDate', null)
            selectDay.value = dayjs(data.day).add(1, 'hour').valueOf()
        }
    }

    // 预约截止日期--从明天开始到后14天选择区间
    const start_time = dayjs().startOf('day').add(1, 'day')
    const over_time = dayjs().endOf('day').add(14, 'day')

    // 已占用
    const occupiedList = reactive(props.equipBook)

    let className
    // 改变样式
    const changeClass = data => {
        // 可以选择的
        // 大于今天的日期都可以选择
        if (dayjs(data.day).valueOf() >= dayjs().startOf('day').valueOf()) {
            className = 'can_select'
        }
        // 不可选
        if (
            dayjs(data.day).valueOf() <= dayjs().startOf('day').valueOf() || //小于今天的日期禁用
            dayjs(data.day).valueOf() > dayjs(over_time).valueOf() //大于截止日期
        ) {
            className = 'over_date'
        }
        // 已被预约
        if (occupiedList.includes(dayjs(data.day).valueOf())) {
            className = 'occupied'
        }
        // 已被自己预约
        if (dayjs(data.day).valueOf() === props.current_select) {
            className = 'current_select'
        }
        // 选择
        if (dayjs(data.day).valueOf() === selectDay.value) {
            if (dayjs(data.day).valueOf() < selectDay.value) {
                return 'can_select'
            }
            className = 'selected'
        }

        return className
    }

    // 头部点击
    const calendar = ref()
    const selectRange = val => {
        loseFocus()
        calendar.value.selectDate(val)
    }
</script>

<style lang="scss" scoped>
    :deep(.el-calendar-day),
    :deep(.el-calendar-day):hover,
    :deep(.el-calendar-day):active {
        background-color: #ffffff;
        user-select: none;
    }
    :deep(.el-calendar-day) {
        height: 60px;
    }
    .current_day {
        width: 100%;
        height: 100%;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
    }
    // 不可选
    .over_date {
        background-color: #909399;
    }
    // 可选
    .can_select {
        background-color: #ffffff;
        color: #333333;
    }
    // 选中
    .selected {
        background-color: #67c23a;
    }
    // 自己已预约
    .current_select {
        background-color: #409eff;
    }
    .selected::after,
    .current_select::after {
        content: '✔️';
        color: blue;
    }
    // 已占用
    .occupied {
        background-color: #e6a23c;
    }

    :deep(.el-calendar-table thead th) {
        user-select: none;
        background-color: #f3f3f3;
    }
    :deep(.el-calendar-table thead th)::before {
        content: '星期';
    }

    // 头部
    .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .left {
            font-weight: bold;
        }
        .right {
            width: 450px;
            display: flex;
            justify-content: space-between;
            .tags {
                width: 220px;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
