const { defineConfig } = require('@vue/cli-service')
// element-plus自动引入
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false, // 关闭语法检查
    // element自动引入
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    },
    // 跨域
    devServer: {
        proxy: {
            '/web': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    },
})
