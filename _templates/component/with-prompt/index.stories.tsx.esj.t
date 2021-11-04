---
  to: components/<%= name %>/index.stories.tsx
---

import {
    Story, Meta
} from '@storybook/vue3'
import <%= name %>, { <%= name %>Props } from '.'

export default {
    title: 'Template/<%= name %>',
    component: <%= name %>,
    // props list
    argTypes: {
        text: {
            type: {
                required: true,
            },
            description: '组件名称',
            control: {
                type: 'text',
            },
        },
    },
} as Meta

const Template: Story<<%= name %>Props> = (args) => <<%= name %> {...args} />

export const Default = Template.bind({})
Default.args = {
    text: '<%= name %>',
}
