<template>
    <div>
        <el-upload
            class="image-uploader"
            action="#"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleChange"
        >
            <img
                v-if="image"
                :src="image"
                class="image"
                :style="{ '--width': max_width, '--height': max_height }"
            />
            <el-icon
                v-else
                class="image-uploader-icon"
            >
                <Plus />
            </el-icon>
        </el-upload>
    </div>
</template>

<script setup>
    import { Plus } from '@element-plus/icons-vue'

    // 接收porps
    const props = defineProps({
        image: String,
        max_width: {
            type: String,
            default: '178px',
        },
        max_height: {
            type: String,
            default: '178px',
        },
    })
    // 注册emit
    const emit = defineEmits(['fileChange'])

    // 选择图片
    const handleChange = file => {
        // console.log(file)
        // userForm.image = URL.createObjectURL(file.raw)
        // userForm.file = file.raw
        emit('fileChange', file.raw)
    }
</script>

<style lang="scss" scoped>
    :deep(.image-uploader) .el-upload {
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: var(--el-transition-duration-fast);
    }

    :deep(.image-uploader) .el-upload:hover {
        border-color: var(--el-color-primary);
    }

    .el-icon.image-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        text-align: center;
    }
    .image-uploader .image {
        max-width: var(--width);
        max-height: var(--height);
        display: block;
    }
</style>
