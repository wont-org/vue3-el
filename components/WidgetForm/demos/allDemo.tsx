import { DataSourceItem } from '../interface'

export const selectList = [
    {
        label: '玩物平台',
        value: '1',
    },
    {
        label: '212',
        value: '2',
    },
]

export const cascaderList = [
    {
        label: '一级类目-1',
        value: '1-1',
        level: 1,
        children: [
            {
                label: '二级类目-1',
                value: '2-1',
                level: 2,
                children: [
                    {
                        label: '三级类目-1',
                        value: '3-1',
                        level: 3,
                    },
                ],
            },
        ],
    },
    {
        label: '一级类目-2',
        value: '1-2',
        level: 1,
        children: [
            {
                label: '二级类目-2',
                value: '2-2',
                level: 2,
            },
        ],
    },
]

export const btnConfig = [
    {
        label: 'link',
        eventName: 'reset',
        // antd 组件属性
        compProps: {
            type: 'link',
        },
    },
    {
        label: 'default',
        eventName: 'reset',
        // antd 组件属性
        compProps: {
            type: 'default',
        },
    },
    {
        label: 'primary',
        eventName: 'query',
        // antd 组件属性
        compProps: {
            type: 'primary',
        },
    },
    {
        label: 'danger',
        eventName: 'submit',
        // antd 组件属性
        compProps: {
            danger: true,
        },
    },
    {
        label: 'success',
        eventName: 'submit',
        // antd 组件属性
        compProps: {
            btnType: 'success',
        },
    },
    {
        label: 'info',
        eventName: 'submit',
        // antd 组件属性
        compProps: {
            btnType: 'info',
        },
    },
    {
        label: 'warning',
        eventName: 'submit',
        // antd 组件属性
        compProps: {
            btnType: 'warning',
        },
    },
]

export const radioConfig = [
    {
        label: '昨日数据',
        value: 1,
    },
    {
        label: '7日数据',
        value: 2,
    },
    {
        label: '30日数据',
        value: 3,
    },
]

export const mockData: DataSourceItem[] = [
    // customRender
    {
        formItemLabel: <b>自定义组件</b>,
        type: 'customRender',
        value: null,
        name: 'select',
        // 组件属性
        compProps: {
            placeholder: '请选择',
        },
        selfProps: {
            options: selectList,
        },
        customRender: () => <div>customRender</div>,
    },
    // input
    {
        formItemLabel: '文本/数字',
        type: 'input',
        value: null,
        name: 'text', // name会作为筛选参数的key，button类则没有key
        // 组件属性
        compProps: {
            placeholder: '请输入',
            type: 'text',
        },
        selfProps: {
            // type: 'number',
        },
        rules: [
            {
                type: 'number',
                required: true,
                message: '请填写数字',
                trigger: 'change',
            },
            {
                validator: async (
                    rule: Record<string, any>,
                    value = ''
                ): Promise<any> => {
                    if (value.length < 3) {
                        return Promise.reject(new Error('长度不可以小于3'))
                    }
                    return Promise.resolve()
                },
                trigger: 'change',
            },
        ],
    },
    // select
    {
        formItemLabel: '下拉选择',
        type: 'select',
        value: null,
        name: 'select',
        selfProps: {
            options: selectList,
        },
        // 组件属性
        compProps: {
            placeholder: '请选择',
        },
    },
    // cascader
    {
        formItemLabel: '多级菜单',
        type: 'cascader',
        value: [],
        selfProps: {
            options: cascaderList,
            fieldNames: {
                label: 'name',
                value: 'cid',
                children: 'children',
            },
        },
        name: 'cascader',
        // 组件属性
        compProps: {
            placeholder: '请选择',
        },
    },
    // rangePicker
    {
        formItemLabel: '日期区间',
        type: 'rangePicker',
        value: ['2021-4-4 00:00:00', '2021-4-5 23:59:59'],
        // value: [],
        name: 'rangePicker',
        // 组件属性
        compProps: {
            placeholder: ['开始时间', '结束时间'],
        },
    },
    // range 范围值
    {
        formItemLabel: '文本区间',
        type: 'rangeInput',
        value: [1, 100],
        name: 'rangeInput',
        // 组件属性
        compProps: [
            {
                placeholder: '请输入供货价',
            },
            {
                placeholder: '请输入供货价',
            },
        ],
        selfProps: {
            type: 'number',
        },
    },
    // button
    {
        formItemLabel: '  ',
        type: 'btnGroup',
        selfProps: {
            options: btnConfig,
        },
        formItemProps: {
            colon: false,
            labelCol: {
                span: 10,
            },
        },
    },
    // radio
    {
        formItemLabel: '单选',
        type: 'radio',
        value: 1,
        name: 'radio',
        eventName: 'radio',
        // 组件属性
        compProps: {
            buttonStyle: 'solid',
        },
        selfProps: {
            options: selectList,
            // radio | button
            type: 'radio',
        },
    },
    // checkbox
    {
        formItemLabel: '多选',
        type: 'checkbox',
        value: [],
        name: 'checkbox',
        eventName: 'checkbox',
        // 组件属性
        selfProps: {
            options: radioConfig,
        },
    },
    // switch
    {
        formItemLabel: '开关',
        type: 'switch',
        value: false,
        name: 'switch',
        eventName: 'switch',
        // 组件属性
        compProps: {
            checkedChildren: '选中',
            unCheckedChildren: '未选中',
        },
        isHidden: false,
    },
]
