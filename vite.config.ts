import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { join } from 'path'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vueJsx({
            mergeProps: false, // 防止写 多个onXXX 被合并后，函数回调错误
        }),
        styleImport({
            libs: [
                {
                    libraryName: 'ant-design-vue',
                    esModule: true,
                    resolveStyle: (name) => {
                        return `ant-design-vue/es/${name}/style/index`
                    },
                },
            ],
        }),
    ],
    resolve: {
        alias: {
            '@': join(__dirname, './'),
            // '@demo': join(__dirname, 'demo'),
            // '@components': join(__dirname, 'components'),
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
        modules: {
            localsConvention: 'camelCase',
        },
    },
})
