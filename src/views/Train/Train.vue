<template>
    <!-- 未登录 -->
    <div
        class="please_login"
        v-if="!store.state.isLogin"
    >
        <a
            href="javascript:;"
            @click="router.push('/login')"
        >
            未登录无法预约设备
        </a>
    </div>
    <!-- 标签页 -->
    <el-tabs
        v-else
        v-model="activeName"
        class="demo-tabs"
        @tab-change="tabChange"
    >
        <el-tab-pane
            label="培训项目列表"
            name="trainList"
        >
            <TrainCourses
                @changeTab="changeTab"
                ref="trainCoursesRef"
            ></TrainCourses>
        </el-tab-pane>
        <!-- 老师课程管理 -->
        <el-tab-pane
            label="我的培训课程"
            name="myTrain"
        >
            <MyCourses ref="myCoursesRef"></MyCourses>
        </el-tab-pane>
    </el-tabs>
</template>
<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import axios from 'axios'
    import dayjs from 'dayjs'
    import TrainCourses from '@/components/Train/TrainCourses.vue'
    import MyCourses from '@/components/Train/MyCourses.vue'

    const store = useStore()
    const router = useRouter()
    // 标签页绑定
    const activeName = ref('trainList')

    // 改变标签页
    const changeTab = newActiveName => {
        activeName.value = newActiveName
    }
    const trainCoursesRef = ref()
    const myCoursesRef = ref()

    // 标签页改变
    const tabChange = newActiveName => {
        if (newActiveName === 'trainList') {
            trainCoursesRef.value.getTableList()
            return
        }
        if (newActiveName === 'myTrain') {
            myCoursesRef.value.getTableList()
            return
        }
    }
</script>
<style lang="scss" scoped>
    .please_login {
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
    }
</style>
