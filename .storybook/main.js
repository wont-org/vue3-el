const vueJsx = require('@vitejs/plugin-vue-jsx')
const { join } = require('path')
const styleImport = require('vite-plugin-style-import').default

// if you conside type safe
// https://miyauchi.dev/posts/storybook-vite/
module.exports = {
    stories: [
        '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
        '../components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    ],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    framework: '@storybook/vue3',
    core: {
        builder: 'storybook-builder-vite',
    },
    //   typescript: {
    //     checkOptions: {
    //         tsconfig: join(__dirname, '../tsconfig.es.json'),
    //         eslint: false,
    //     },
    //   },
    async viteFinal(config = {}) {
        let { plugins = [], resolve = {}, css = {}, optimizeDeps = {} } = config

        plugins = plugins.concat([
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
        ])
        css = {
            ...css,
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                },
            },
        }
        resolve.alias = {
            ...resolve.alias,
            '@': join(__dirname, './'),
        }
        console.log('plugins :>> ', plugins)
        return {
            ...config,
            plugins,
            resolve,
            css,
            optimizeDeps,
        }
    },
}
