import { Meta } from '@storybook/vue3'
import {
    defineComponent, watch, ref 
} from 'vue'
import useCountDown from '.'

const UseCountDownDemo = defineComponent({
    name: 'UseCountDownDemo',
    setup() {
        const { countDown, getCountDownText, state } = useCountDown()
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
                    onClick={() => countDown()}
                >
                    获取验证码
                </button>
            </div>
        )
    },
})

export default {
    title: 'hooks/useCountDown',
    component: UseCountDownDemo,
} as Meta

const Template = (args) => <UseCountDownDemo {...args} />

export const Default = Template.bind({})
