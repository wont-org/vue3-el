---
  to: components/<%= name %>/index.tsx
---
import {defineComponent} from 'vue'
import type {PropType} from 'vue'
import classnames from 'classnames'

import './index.less'

const prefix = 'wont-<%= h.changeCase.paramCase(name) %>'

export interface <%= name %>Props {
    text: string
}

export default defineComponent({
    name: '<%= name %>',
    props: {
        text: {
            type: String  as PropType<<%= name %>Props['text']>,
            required: true,
        },
    },
    setup(props) {
        const cls = classnames(`${prefix}`, {
        })
        return () => {
            return (
                <section class={cls}>
                    {props.text}
                </section>
            )
        }
    },
})
