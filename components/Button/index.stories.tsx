import {
    Story, Meta 
} from '@storybook/vue3'
import type { ButtonProps } from 'ant-design-vue'
import Button, {
    btnType, antdBtnType 
} from '.'

export default {
    title: 'Form/Button',
    component: Button,
    argTypes: {
        btnType: {
            description: `antdv的type基础上扩展了三种，分别是${btnType.join(
                ','
            )}`,
            table: {
                defaultValue: {
                    summary: 'default',
                },
                type: {
                    summary: [...antdBtnType, ...btnType],
                },
            },
            control: {
                type: 'select',
                options: [...antdBtnType, ...btnType],
            },
        },
    },
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>

export const Default = Template.bind({})
Default.args = {
    btnType: 'default',
}
