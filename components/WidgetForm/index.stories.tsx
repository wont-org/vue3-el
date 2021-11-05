import {
    Story, Meta 
} from '@storybook/vue3'
import WidgetForm, { WidgetFormProps } from '.'
import { mockData } from './demoConfig'

export default {
    title: 'Form/WidgetForm',
    component: WidgetForm,
    parameters: {
        docs: {
            description: {
                component:
                    '多功能form，可用来做表单，表格搜索项。内置组件脱胎于antdv',
            },
            source: {
                type: 'auto',
                code: `
                    <WidgetForm dataSource={dataSource} />
                `,
            },
        },
    },
    argTypes: {
        dataSource: {
            description:
                '表单配置原数据。<br/>表单数据会根据DataSourceItem, 将name作为key, value作为默认值生成。<br/>类型详见`DataSourceItem[]`',
            type: {
                required: true,
            },
            table: {
                defaultValue: {
                    summary: '必选，无默认值。详见右侧control数据',
                },
            },
            control: {
                type: 'array',
                labels: mockData,
            },
        },
        config: {
            description:
                '参照antdv，model和rules自动生成，不需要传。类型详见`FormProps`',
            type: {
                required: false,
            },
            table: {
                defaultValue: {
                    summary: '可选，默认值同antdv的form props',
                },
            },
            control: {
                type: 'object',
                // labels: {},
            },
        },
        watchInitModel: {
            description:
                'dataSource变化时，触发onInitModel方法。<br/>**慎用！**如onInitModel方法中有副作用，则会导致递归。<br/>一般情况，onInitModel与watchInitModel不共存。',
            type: {
                required: false,
            },
            table: {
                defaultValue: {
                    summary: `可选。详见右侧control数据`,
                },
            },
            control: {
                type: 'object',
            },
        },
        onInitModel: {
            description: '表单初始化时会触发此方法，入参是初始化表单数据',
            type: {
                required: false,
            },
            table: {
                defaultValue: {
                    summary: `()=> {}`,
                },
            },
            control: {
                type: 'function',
            },
        },
        onChange: {
            description: '表单数据变化时调用。',
            type: {
                required: false,
            },
            table: {
                defaultValue: {
                    summary: `()=> {}`,
                },
            },
            control: {
                type: 'function',
            },
        },
    },
} as Meta

const Template: Story<WidgetFormProps> = (args) => <WidgetForm {...args} />

// 组件总览
export const Overview = Template.bind({})
Overview.args = {
    dataSource: mockData,
    config: {
        // layout: 'horizontal',
        // labelCol: { span: 8 },
        // wrapperCol: { span: 16 },
        // labelAlign: 'right',
    },
    watchInitModel: {
        updateState: false,
        emitInitModel: false,
    },
    onInitModel: (state) => {
        console.log('onInitModel :>> ', state)
    },
    onChange: (state) => {
        console.log('onChange :>> ', state)
    },
}
