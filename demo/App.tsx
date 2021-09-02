import {
    defineComponent, reactive 
} from 'vue'
import {
    RouterLink, RouterView, RouteRecordRaw, useRoute 
} from 'vue-router'
import { Tabs } from 'ant-design-vue'
import { routes } from '@/demo/router'

export default defineComponent({
    name: 'App',
    setup() {
        const route = useRoute()
        // console.log('route.path :>> ', route)
        const stateRef = reactive({
            activeKey: '',
        })

        return () => {
            stateRef.activeKey = route.path
            return (
                <section class="flex-x-center w100-per">
                    <Tabs
                        type="card"
                        v-model={[stateRef.activeKey, 'activeKey']}
                    >
                        {routes.map((r: RouteRecordRaw) => {
                            const { path, name, meta = {} } = r
                            const { isHidden } = meta
                            return (
                                !isHidden && (
                                    <Tabs.TabPane
                                        key={path}
                                        tab={
                                            <RouterLink
                                                class={
                                                    path !== stateRef.activeKey
                                                        ? 'a-reset'
                                                        : ''
                                                }
                                                to={path}
                                            >
                                                {name}
                                            </RouterLink>
                                        }
                                    />
                                )
                            )
                        })}
                    </Tabs>
                    <div class="w90-per border-1px-red">
                        <RouterView />
                    </div>
                </section>
            )
        }
    },
})
