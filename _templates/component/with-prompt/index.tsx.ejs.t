---
  to: components/<%= name %>/index.tsx
---
import {
    defineComponent, PropType
} from 'vue'
import classnames from 'classnames'

import './index.less'

const prefix = 'wanwu-<%= h.changeCase.paramCase(name) %>'

export interface <%= name %>Props {
    className?: string
    type?: boolean
}

export default defineComponent({
    name: '<%= name %>',
    props: {
        type: {
            type: Boolean as PropType<<%= name %>Props>,
            default: false,
        },
    },
    setup(props) {
        const cls = classnames(`${prefix}`, {
            [`${prefix}-${props.type}`]: props.type,
        })

        return () => {
            return (
                <section class={cls}>
                    <%= name %>
                </section>
            )
        }
    },
})
