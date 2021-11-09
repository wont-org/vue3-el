import { DataSourceItem } from '../interface'
import { selectList } from './allDemo'

export const fetch = () => {
    const result = [
        {
            label: '异步数据1',
            value: '1',
        },
    ]
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('fetch')
            resolve(result)
        }, 2000)
    })
}

export const formDateSource: DataSourceItem[] = [
    {
        formItemLabel: '下拉1',
        type: 'select',
        value: '1',
        name: 'select1',
        selfProps: {
            options: selectList,
            // fieldNames: {
            //     label: 'label',
            //     value: 'value',
            // },
        },
        // 组件属性
        compProps: {
            placeholder: '请选择',
        },
        formItemProps: {
            required: true,
        },
    },
    {
        formItemLabel: '下拉2。下拉1更新时，重新发起请求',
        type: 'select',
        value: null,
        name: 'select2',
        selfProps: {
            options: async () => {
                const result = (await fetch()) as unknown[]
                return result
            },
            deps: {
                options: ['select1'],
            },
        },
        // 组件属性
        compProps: {
            placeholder: '请选择',
        },
        formItemProps: {
            required: true,
        },
    },
]
