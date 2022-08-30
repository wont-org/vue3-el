import { Meta } from '@storybook/vue3'
import {
    defineComponent, ref 
} from 'vue'
import useOverflow from '.'

const Overflow = defineComponent({
    name: 'Overflow',
    setup() {
        const containerRef = ref()
        const contentRef = ref()
        const overflow = useOverflow(containerRef, contentRef)

        return () => (
            <div>
                <div
                    ref={(el) => {
                        containerRef.value = el
                    }}
                    style={{
                        width: '300px',
                        height: '300px',
                        background: 'skyblue',
                        overflow: 'hidden',
                        border: '1px solid red',
                        whiteSpace: 'nowrap',
                        zIndex: 2,
                    }}
                >
                    <div
                        ref={(el) => {
                            contentRef.value = el
                        }}
                        style={{
                            width: '400px',
                            height: '300px',
                            background: 'yellow',
                            zIndex: -1,
                        }}
                    >
                        内容是否溢出：{overflow.value ? '是' : '否'}
                    </div>
                </div>
            </div>
        )
    },
})

export default {
    title: 'hooks/useOverflow',
    component: Overflow,
} as Meta

const Template = (args) => <Overflow {...args} />

export const Default = Template.bind({})
