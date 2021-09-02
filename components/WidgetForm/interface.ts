import { Moment } from 'moment'
import { ValidationRule } from 'ant-design-vue/es/form/Form'
import { FormItemProps } from 'ant-design-vue/es/form/FormItem'
import { VueNode } from '../_common/type'

export interface WatchInitModel {
    updateState?: boolean
    emitInitModel?: boolean
}

export interface Cate {
    level?: number
    categoryId: number
    childs?: Cate[]
}

export interface TimeConfig {
    momentDate: Moment[]
    dateString: string[]
    second: number[]
    msec: number[]
    daySecond: number[]
}

export type FormType = [
    'input',
    'select',
    'cascader',
    'rangePicker',
    'rangeInput',
    'rangeInput',
    'btnGroup',
    'radio',
    'checkbox',
    'switch',
    'customRender'
]

export interface FieldNames {
    label: string
    value: string | number
    children?: string
}

export interface Deps {
    options: any[]
}

export interface OptionItem extends Record<string, any> {
    disabled?: boolean
    children?: OptionItem[]
}

export interface BtnConfigItem {
    label: string
    eventName?: string
    compProps?: Record<string, any>
}

export interface SelfProps extends Record<string, any> {
    // radio 组件 'radio' | 'button' input rangeInput 组件支持 'input' | 'number'
    type?: 'radio' | 'button' | 'input' | 'number'
    // 仅支持有options的组件 同antd cascader的fieldNames
    fieldNames?: FieldNames
    // 依赖项发生变化时，更新本项options
    deps?: Deps
    // 格式化数据，目前仅支持 checkbox
    dataType?: string
    options?:
    | OptionItem[]
    | BtnConfigItem[]
    | any[]
    | (() => Promise<unknown[]>)
}

export interface ExtraRender {
    tips?: any
}

export interface DataSourceItem {
    formItemLabel: FormItemProps['label']
    type: FormType[number]
    value?: any | any[]
    name?: string
    // 隐藏整个formItem
    isHidden?: boolean
    compProps?: Record<string, any> | Record<string, any>[]
    eventName?: string
    // search场景不要传rules，表单场景按需
    rules?: ValidationRule[] | ValidationRule
    selfProps?: SelfProps
    // 自定义组件，defineComponent
    customRender?: (...rest: any[]) => VueNode
    // 额外展示项，目前仅支持一般为提示项 defineComponent
    extraRender?: ExtraRender
    formItemProps?: FormItemProps
}
