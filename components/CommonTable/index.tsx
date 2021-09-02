/*
 * @Author: ganlan
 * @Date: 2021-03-18 11:21:53
 * @Description:
 */

import {
    defineComponent, computed, PropType 
} from 'vue'
import {
    Table, Image 
} from 'ant-design-vue'
import { TableProps } from 'ant-design-vue/es/table/interface'
import { CopyOutlined } from '@ant-design/icons-vue'
import moment from 'moment'
import { createClasses } from 'vue3-emotion'
import { get } from 'lodash'
import {
    slimCdnImg, copyContent 
} from '../_common/utils'
import ViewVideo from '../ViewVideo'
import {
    IMG, REG_EXP 
} from '../_common/constant'
import {
    tableHeader, tableBody 
} from './demoConfig'
import Button from '../Button'
import { TableHeader } from './interface'

const { PreviewGroup } = Image

export interface PageParams {
    current: number
    pageSize: number
    total: number
}

export type Columns = TableHeader[]
export type RowSelection = TableProps['rowSelection'] | null
export type Pagination = Exclude<TableProps['pagination'], boolean>
// 通用table组件，预处理了一些常用格式，封装了分页函数等
const CommonTableProps = {
    // 表头
    columns: {
        type: Array as PropType<Columns>,
        default: (): Columns => tableHeader,
        // required: true,
    },
    // 数据源
    dataSource: {
        type: Array,
        default: () => tableBody,
        // required: true,
    },
    // 多选参数，具体使用方法与ant design一致
    rowSelection: {
        type: [Object, null] as PropType<RowSelection>,
        default: (): RowSelection => null,
    },
    // 内容超长的滚动参数配置，不加可能会展示错位
    scroll: {
        type: Object as PropType<TableProps['scroll']>,
        default: (): TableProps['scroll'] => ({
            x: 2000,
        }),
    },
    // table所有参数，可覆盖，详见ant design文档)
    additionProps: {
        type: Object as PropType<TableProps>,
        default: (): TableProps => ({
            // TODO 如何保证rowKey唯一
            rowKey: 'id',
        }),
    },
    pagination: {
        type: Object as PropType<Pagination>,
        default: (): Pagination => ({
            total: tableBody.length,
            current: 1,
            pageSize: 10,
        }),
    },
}
export default defineComponent({
    name: 'CommonTable',
    props: CommonTableProps,
    setup(props) {
        const classRef = createClasses(() => ({
            iconStyle: {
                color: '#008dff',
                marginLeft: '5px',
            },
        }))

        const isVideo = (src: string): boolean => {
            return /\.(mp4|avi|mov|3gp)$/.test(src)
        }

        const handleCustomRow = (row, rowIndex) => {
            const { current, pageSize } = props.pagination
            const customIdx = (current - 1) * pageSize + rowIndex + 1
            row.customIdx = customIdx
        }

        const formatColumnsList = (data: any[]): any => {
            if (!(Array.isArray(data) && data.length)) {
                return undefined
            }
            return data.map((item: any) => {
                if (Array.isArray(item.children) && item.children.length) {
                    item.children = formatColumnsList(item.children)
                } else {
                    const { dataType, ...params } = item

                    if (dataType !== 'custom') {
                        params.customRender = ({
                            text,
                            column,
                            record,
                            index,
                        }: {
                            text: any
                            column: any
                            record: Record<string, any>
                            index: number
                        }) => {
                            const thumbnailAttrs = {
                                width: '80px',
                                height: '80px',
                            }
                            // 常见类型转换

                            if (dataType === 'img') {
                                const url = text || IMG.default
                                return (
                                    <Image
                                        {...thumbnailAttrs}
                                        src={
                                            column.noNeedSlim
                                                ? url
                                                : slimCdnImg(url)
                                        }
                                    />
                                )
                            }
                            if (dataType === 'video') {
                                return <ViewVideo src={text} />
                            }
                            if (dataType === 'imgsOrVideos') {
                                return (
                                    <PreviewGroup>
                                        {(Array.isArray(text) &&
                                            text.length &&
                                            text.map((resourceSrc: string) => {
                                                const url =
                                                    resourceSrc || IMG.default
                                                return isVideo(resourceSrc) ? (
                                                    <ViewVideo
                                                        src={resourceSrc}
                                                    />
                                                ) : (
                                                    <Image
                                                        wrapperStyle={{
                                                            marginRight: '8px',
                                                        }}
                                                        {...thumbnailAttrs}
                                                        src={
                                                            column.noNeedSlim
                                                                ? url
                                                                : slimCdnImg(
                                                                    url
                                                                )
                                                        }
                                                    />
                                                )
                                            })) ||
                                            text}
                                    </PreviewGroup>
                                )
                            }
                            // 金额分转元
                            if (dataType === 'penny') {
                                const price = Number.isNaN(+text) ? 0 : +text
                                return `${(price / 100).toFixed(2)}元`
                            }
                            if (dataType === 'link') {
                                return REG_EXP.url.test(encodeURI(text)) ? (
                                    <a
                                        href={text}
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                    >
                                        {text}
                                    </a>
                                ) : (
                                    text
                                )
                            }
                            if (dataType === 'date') {
                                return moment(
                                    column.isMillisecond
                                        ? text
                                        : (Number.isNaN(+text) ? 0 : +text) *
                                              1000
                                ).format('YYYY-MM-DD HH:mm:ss')
                            }
                            if (dataType === 'copy') {
                                return text ? (
                                    <span
                                        role="presentation"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            copyContent(text)
                                        }}
                                    >
                                        {text}
                                        <CopyOutlined
                                            class={classRef.value.iconStyle}
                                        />
                                    </span>
                                ) : (
                                    ''
                                )
                            }
                            // 枚举类型
                            if (dataType === 'enum') {
                                if (
                                    Object.prototype.toString.call(
                                        column.enum
                                    ) === '[object Object]'
                                ) {
                                    return get(column, `enum[${text}]`, '-')
                                }
                                if (Array.isArray(column.enum)) {
                                    const enumItem =
                                        column.enum.find(
                                            (en: Record<string, unknown>) =>
                                                en?.value?.toString?.() ===
                                                text?.toString?.()
                                        ) || {}
                                    return get(enumItem, 'label', '-')
                                }
                                return text
                            }
                            // 计算参数
                            if (dataType === 'calc') {
                                if (typeof column.calc === 'function') {
                                    return <div>{column.calc(record)}</div>
                                }
                                return '-'
                            }
                            // 卡片，手机号等隐私展示
                            if (dataType === 'encrypt') {
                                if (typeof text === 'string') {
                                    if (text.length <= 0) {
                                        return text
                                    }

                                    const arr = text.split('')
                                    return arr.length < 3
                                        ? '*'
                                        : arr.reduce(
                                            (
                                                acc: string,
                                                word: string,
                                                idx: number
                                            ): string => {
                                                let newAcc = acc
                                                  // 最长不超过13位
                                                if (
                                                    idx < 12 ||
                                                      idx === arr.length - 1
                                                ) {
                                                    newAcc +=
                                                          idx === 0 ||
                                                          idx === arr.length - 1
                                                              ? word
                                                              : '*'
                                                }
                                                return newAcc
                                            },
                                            ''
                                        )
                                }
                                console.error(
                                    'common table加密类型需要字符串格式数据'
                                )
                                return text || '-'
                            }
                            // 操作
                            if (dataType === 'operation') {
                                return (
                                    column.operates &&
                                    Array.isArray(column.operates) &&
                                    column.operates.map((operate: any) => {
                                        let showBtn = true
                                        if (
                                            typeof operate.show === 'function'
                                        ) {
                                            showBtn = operate.show(record)
                                        }

                                        const compProps =
                                            typeof operate.compProps ===
                                            'function'
                                                ? operate.compProps(record)
                                                : operate.compProps
                                        // console.log('compProps :>> ', compProps)
                                        const type =
                                            typeof operate.type === 'function'
                                                ? operate.type(record)
                                                : operate.type
                                        return (
                                            showBtn && (
                                                <Button
                                                    type={type}
                                                    style={{
                                                        marginRight: '5px',
                                                        marginTop: '5px',
                                                        ...(operate.style ||
                                                            {}),
                                                    }}
                                                    onClick={() => {
                                                        typeof operate.onClick ===
                                                            'function' &&
                                                            operate.onClick(
                                                                record,
                                                                index
                                                            )
                                                        handleCustomRow(
                                                            record,
                                                            index
                                                        )
                                                        // console.log('record :>> ', record, index)
                                                    }}
                                                    {
                                                        // 所有antd属性
                                                        ...(compProps || {})
                                                    }
                                                >
                                                    {typeof operate.text ===
                                                    'function'
                                                        ? operate.text(record)
                                                        : operate.text}
                                                </Button>
                                            )
                                        )
                                    })
                                )
                            }
                            if ([undefined, NaN, null].includes(text)) {
                                return '-'
                            }
                            return text
                        }

                        params.key = item.key || item.dataIndex
                        // params.key = 'customIdx'
                        return params
                    }
                }
                return item
            })
        }

        const columns = computed(() => formatColumnsList(props.columns))

        return () => {
            return (
                <Table
                    rowKey="id"
                    columns={columns.value}
                    dataSource={props.dataSource}
                    rowSelection={props.rowSelection}
                    scroll={props.scroll}
                    bordered
                    pagination={{
                        pageSizeOptions: ['10', '20', '30', '50', '100'],
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total: number, range: number[]) => {
                            return `总数 ${total} 的 ${range.join('-')}`
                        },
                        ...props.pagination,
                    }}
                    customRow={handleCustomRow}
                    {...props.additionProps}
                />
            )
        }
    },
})

export * from './interface'
