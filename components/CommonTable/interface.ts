import { ButtonProps } from 'ant-design-vue/es/button/buttonTypes'
import { ColumnProps } from 'ant-design-vue/es/table/interface'
import { HTMLAttributes } from 'vue'
import { BtnType } from '../Button/index'
import {
    FieldNames, VueNode 
} from '../_common/type'

export interface OperateBtnProps extends ButtonProps {
    btnType?: BtnType | ButtonProps['type']
}

export interface Operate {
    // 不建议style，compProps下用class
    style?: HTMLAttributes['style']
    text: string | ((record: Record<string, any>) => string)
    type?:
    | ButtonProps['type']
    | ((record: Record<string, any>) => ButtonProps['type'])
    show?: boolean | ((record: Record<string, any>) => boolean)
    onClick?: (record: Record<string, any>) => void
    compProps?:
    | OperateBtnProps
    | ((record: Record<string, any>) => OperateBtnProps)
}

export interface TableHeader extends ColumnProps {
    title: string
    dataIndex?: string
    noNeedSlim?: boolean
    // date to ms timestamp
    isMillisecond?: boolean
    width?: number
    dataType?:
    | 'custom'
    | 'img'
    | 'video'
    | 'imgsOrVideos'
    | 'imgsOrVideos'
    | 'penny'
    | 'link'
    | 'date'
    | 'copy'
    | 'enum'
    | 'calc'
    | 'encrypt'
    | 'operation'
    enum?: FieldNames[] | Record<string, string>
    calc?: (record: Record<string, any>) => VueNode
    customRender?: (record: Record<string, any>) => VueNode
    fixed?: 'left' | 'right' | boolean
    key?: string
    operates?: Operate[]
    children?: TableHeader[]
}
