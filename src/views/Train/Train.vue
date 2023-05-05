<template>
    <el-tabs
        v-model="activeName"
        class="demo-tabs"
    >
        <el-tab-pane
            label="培训项目列表"
            name="trainList"
        >
            <TrainCourses></TrainCourses>
        </el-tab-pane>
        <!-- 老师课程管理 -->
        <el-tab-pane
            label="我的培训课程"
            name="myTrain"
        ></el-tab-pane>
    </el-tabs>
</template>
<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import axios from 'axios'
    import dayjs from 'dayjs'
    import TrainCourses from '@/components/Train/TrainCourses.vue'

    const store = useStore()
    // 标签页绑定
    const activeName = ref('trainList')
</script>
<style lang="scss" scoped></style>
