import { VNodeChild } from 'vue'

export interface FieldNames {
    label: string
    value: string | number
}

export type VueNode = VNodeChild | JSX.Element
