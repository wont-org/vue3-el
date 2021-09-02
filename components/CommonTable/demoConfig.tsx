import { TableHeader } from './interface'

export const tableHeader: TableHeader[] = [
    {
        title: '序号',
        dataIndex: 'customIdx',
        sorter: true,
        defaultSortOrder: 'ascend',
        sortDirections: ['descend'],
    },
    {
        title: 'undefined, NaN, null',
        dataIndex: 'invalid',
        sorter: true,
        defaultSortOrder: 'ascend',
        sortDirections: ['ascend'],
        width: 200,
    },
    {
        title: '空字符串',
        dataIndex: 'emptyStr',
        sorter: true,
    },
    {
        title: '数字0',
        dataIndex: 'num0',
    },
    {
        title: '文本',
        dataIndex: 'age',
    },
    {
        title: '合并表头',
        children: [
            {
                title: '图片',
                dataIndex: 'url',
                noNeedSlim: true, // 是否需要加瘦身后缀，默认为true
                dataType: 'img',
            },
            {
                title: '视频',
                dataIndex: 'video',
                dataType: 'video',
            },
        ],
    },
    {
        title: '多图片/视频',
        dataIndex: 'imgs',
        // noNeedSlim: true,
        dataType: 'imgsOrVideos',
        width: 300,
    },
    {
        title: '价格',
        dataIndex: 'price',
        dataType: 'penny',
    },
    {
        title: '日期',
        dataIndex: 'date',
        dataType: 'date',
        // isMillisecond: true, // 是否是毫秒级，默认为秒级的数据，需要乘1000
    },
    {
        title: '复制',
        dataIndex: 'address',
        dataType: 'copy',
    },
    {
        title: '枚举',
        dataIndex: 'key',
        dataType: 'enum',
        // enum可以是数组(字段名固定)，也可以是对象
        enum: [
            {
                label: '枚举1',
                value: '1',
            },
            {
                label: '枚举2',
                value: '2',
            },
        ],
        // enum: {
        //     '1': '枚举1',
        //     '2': '枚举2',
        // },
    },
    {
        title: '链接',
        dataIndex: 'name',
        dataType: 'link',
        width: 100,
    },
    {
        title: '自行计算',
        dataIndex: 'tags',
        dataType: 'calc',
        calc: (record: Record<string, any>) => {
            return `${record.tags.join('+')},done`
        },
    },
    {
        title: '内容加密',
        dataIndex: 'address',
        dataType: 'encrypt',
    },
    {
        title: '自定义模式',
        dataIndex: 'address',
        dataType: 'custom',
        customRender: (row: any) => {
            return (
                <span
                    title={row.record.address}
                >{`${row.record.key}:${row.record.age}`}</span>
            )
        },
    },
    {
        title: '操作',
        key: 'operation',
        dataType: 'operation',
        width: 230,
        fixed: 'right',
        operates: [
            {
                text: 'primary',
                type: 'primary',
                show: (record: any) => record.age > 32,
            },
            {
                text: 'default',
                type: 'default',
                // 不建议style，compProps下用class
                style: { marginRight: '10px' },
            },
            {
                text: 'warning',
                compProps: () => ({
                    btnType: 'warning',
                }),
            },
            {
                text: 'danger',
                compProps: {
                    type: 'primary',
                    danger: true,
                    // ghost: true,
                },
            },
            {
                text: 'success',
                compProps: {
                    btnType: 'success',
                },
            },
            {
                text: 'info',
                compProps: {
                    btnType: 'info',
                },
            },
        ],
    },
]

const mockTable = () => {
    const result = []
    const tableBody = [
        {
            key: '1',
            id: '1',
            invalid: null,
            emptyStr: '',
            num0: 0,
            name: '/categories/front',
            age: 32,
            price: 1059,
            address: 'No',
            tags: ['nice', 'developer'],
            url: '',
            // 'https://cdn.wanwudezhi.com/mall-portal/video/8289019_MTU3NTcyMTA4MDU5MQ==.mov.mp4?vframe/jpg/offset/4',
            imgs: [
                '',
                // https://cdn.wanwudezhi.com/mall-portal/image/326937_MTYxNjEyMzE3MzYzNQ==565_750x1334.jpg
                'https://cdn.wanwudezhi.com/mall-portal/image/20606562_MTYxNTU1NzM2NDE2Mw==646_800x800.jpg',
                'https://cdn.wanwudezhi.com/mall-portal/video/2807879_MTYxNjM3NzM3MTE1Mw==519.mp4',
            ],
            date: 1616137886,
            video: 'https://cdn.wanwudezhi.com/mall-portal/video/326937_MTYxNjE0MDcyMzQyNQ==179.mp4',
        },
        {
            key: '2',
            id: '2',
            emptyStr: '',
            num0: 0,
            name: 'https://cdn.wanwudezhi.com/mall-portal/image/326937_MTYxNjEyMzE3MzYzNQ==565_750x1334.jpg',
            age: 33,
            price: 37000,
            address: 'New York Yes',
            tags: ['nice', 'developer'],
            url: 'https://cdn.wanwudezhi.com/mall-portal/image/3339994_MTU3NDY2ODQ0OTA3MA==_828_828.jpg',
            imgs: [
                'https://cdn.wanwudezhi.com/mall-portal/image/18613491_MTYxNTI3MDAyODc5MA==30_3000x3000.jpg',
            ],
            date: 1582041600,
            video: 'https://cdn.wanwudezhi.com/mall-portal/video/326937_MTYxNjEyMzE5NTA0Mw==91.mp4',
        },
        {
            key: '3',
            id: '3',
            emptyStr: '',
            num0: 0,
            name: 'https://cdn.wanwudezhi.com/seller-admin/csv/证书自查1622777953.xlsx',
            age: 33,
            price: 37000,
            address: 'New York Yes',
            tags: ['nice', 'developer'],
            url: 'https://cdn.wanwudezhi.com/mall-portal/image/3339994_MTU3NDY2ODQ0OTA3MA==_828_828.jpg',
            imgs: [
                'https://cdn.wanwudezhi.com/mall-portal/image/18613491_MTYxNTI3MDAyODc5MA==30_3000x3000.jpg',
            ],
            date: 1582041600,
            video: 'https://cdn.wanwudezhi.com/mall-portal/video/326937_MTYxNjEyMzE5NTA0Mw==91.mp4',
        },
    ]
    for (let i = 0; i < 10; i += 1) {
        result.push(...tableBody)
    }
    return result
}

export const tableBody = mockTable()
