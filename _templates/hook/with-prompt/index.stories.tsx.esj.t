---
  to: components/<%= name %>/index.stories.tsx
---

import {
    Meta
} from '@storybook/vue3'
import {
    defineComponent,
} from 'vue'
import <%= name %> from '.'

const <%= Name %>Demo = defineComponent({
    name: '<%= Name %>Demo',
    setup() {
        const {
            countRef,
        } = <%= name %>()
        return () => (
            <div>
                <%= Name %>Demo: {countRef.value}
            </div>
        )
    },
})

export default {
    title: 'hooks/<%= name %>',
    component: <%= Name %>Demo,
} as Meta

const Template = (args) => <<%= Name %>Demo {...args} />

export const Default = Template.bind({})
