import { Meta } from '@storybook/vue3'
import {
    defineComponent, watch, ref 
} from 'vue'
import useCountDownCache from '.'

const UseCountDownCacheDemo = defineComponent({
    name: 'UseCountDownCacheDemo',
    setup() {
        const {
            countDown,
            getCountDownText,
            state,
            countDisabledRef,
        } = useCountDownCache()
        const btnRef = ref()

        watch(
            () => state.count,
            () => {
                btnRef.value.innerText = getCountDownText()
            }
        )

        return () => (
            <div>
                <button
                    type="button"
                    ref={btnRef}
                    disabled={state.count > 0}
                    onClick={() => {
                        countDisabledRef.value = true
                        countDown()
                    }}
                >
                    获取验证码
                </button>
            </div>
        )
    },
})

export default {
    title: 'hooks/useCountDownCache',
    component: UseCountDownCacheDemo,
} as Meta

const Template = (args) => <UseCountDownCacheDemo {...args} />

export const Default = Template.bind({})
