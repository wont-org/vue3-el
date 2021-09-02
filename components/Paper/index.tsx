import {
    defineComponent, onBeforeMount, watch 
} from 'vue'

import { createClasses } from 'vue3-emotion'

let image = ''

const defaultParams = {
    container: document.body,
    width: '180px',
    height: '100px',
    textAlign: 'center',
    textBaseline: 'middle',
    font: '14px microsoft yahei',
    fillStyle: 'rgba(184, 184, 184, 0.3)',
    rotate: 25,
}

function createCanvas(content: string) {
    const canvas = window.document.createElement('canvas')

    canvas.setAttribute('width', defaultParams.width)
    canvas.setAttribute('height', defaultParams.height)
    const ctx: any = canvas.getContext('2d')

    ctx.textAlign = defaultParams.textAlign
    ctx.textBaseline = defaultParams.textBaseline
    ctx.font = defaultParams.font
    ctx.fillStyle = defaultParams.fillStyle
    ctx.rotate((Math.PI / 180) * defaultParams.rotate)
    ctx.translate(0, -55)
    ctx.fillText(
        content,
        parseFloat(defaultParams.width) / 2,
        parseFloat(defaultParams.height) / 2
    )

    const base64Url = canvas.toDataURL()
    // return base64Url
    image = base64Url
}

export default defineComponent({
    name: 'Paper',
    props: {
        watermark: {
            type: Boolean,
            default: true,
        },
        padding: {
            type: Boolean,
            default: true,
        },
        userName: {
            type: String,
            default: '',
        },
    },
    setup(props, { slots }) {
        const cxRef = createClasses(() => ({
            root: {
                background: '#fff',
                backgroundImage: `url('${image}')`,
                backgroundRepeat: 'repeat',
                padding: props.padding ? 20 : 0,
            },
        }))

        onBeforeMount(() => {
            createCanvas(props.userName || '请先登录')
        })

        watch(
            () => props.userName,
            () => {
                createCanvas(props.userName || '请先登录')
            },
            { deep: true }
        )

        return () => {
            const cx = cxRef.value
            return <div class={cx.root}>{slots.default && slots.default()}</div>
        }
    },
})
