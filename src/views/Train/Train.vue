<template>
    <!-- 标签页 -->
    <!-- <div class="btn"> -->
    <el-input
        v-model="searchText"
        placeholder="搜索设备名称"
        @keyup.enter="tabChange"
        clearable
    >
        <template #append>
            <el-button
                :icon="Search"
                @click="tabChange"
            ></el-button>
        </template>
    </el-input>
    <!-- </div> -->
    <el-tabs
        v-model="activeName"
        class="tabs"
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
    import { ref } from 'vue'
    import { Search } from '@element-plus/icons-vue'
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

    // 输入框文字
    const searchText = ref('')
    // 标签页改变
    const tabChange = () => {
        if (activeName.value === 'trainList') {
            trainCoursesRef.value.getTableList(searchText.value)
            return
        }
        if (activeName.value === 'myTrain') {
            myCoursesRef.value.getTableList(searchText.value)
            return
        }
    }
</script>
<style lang="scss" scoped>
    .tabs {
        background-color: #fff;
        padding: 20px;
        min-height: 300px;
    }
    .el-input {
        width: 400px;
        position: absolute;
        z-index: 3;
        margin: 20px 0 0 838px;
    }
</style>
