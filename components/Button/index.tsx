import {
    defineComponent, PropType 
} from 'vue'
import { Button } from 'ant-design-vue'
import buttonProps from 'ant-design-vue/es/button/buttonTypes'
import './index.less'

export type BtnType = 'success' | 'info' | 'warning'
// export interface ExtraButtonProps extends Omit<ButtonProps, 'type'> {
//     type: BtnType | ButtonProps['type']
// }

const antdBtnProps = buttonProps()
export default defineComponent({
    name: 'Button',
    props: {
        ...antdBtnProps,
        btnType: {
            type: String as PropType<BtnType>,
            default: '',
        },
    },
    setup(props, { slots }) {
        const type = props.type || props.btnType
        return () => {
            const btnTypeCls = type ? `ant-btn-${type}` : ''
            return (
                <section class="ant-btn-wrap">
                    <Button class={`${btnTypeCls}`} {...props}>
                        {typeof slots.default === 'function' && slots.default()}
                    </Button>
                </section>
            )
        }
    },
})
