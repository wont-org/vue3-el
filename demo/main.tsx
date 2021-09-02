import { createApp } from 'vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import App from '@/demo/App'
import router from '@/demo/router'

import { ConfigProvider } from 'ant-design-vue'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
import 'ant-design-vue/dist/antd.css'
import '@/demo/style/common.less'

moment.locale('zh-cn')

createApp(() => (
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>
))
    .use(router)
    .mount('#app')
