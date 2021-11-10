import {
    defineComponent, PropType 
} from 'vue'
import { Button } from 'ant-design-vue'
import buttonProps from 'ant-design-vue/es/button/buttonTypes'
import './index.less'

export const antdBtnType = [
    'default',
    'link',
    'text',
    'dashed',
    'ghost',
    'primary',
] as const
export const btnType = ['success', 'info', 'warning'] as const
export type BtnType = typeof btnType[number] | typeof antdBtnType[number]
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
        const type = props.btnType || props.type
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
