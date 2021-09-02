import { message } from 'ant-design-vue'

export function emitEmpty(obj: Record<string, any>): Record<string, any> {
    const newObj: Record<string, any> = {}
    Object.keys(obj).forEach((k) => {
        if (obj[k] !== '' && obj[k] !== null && obj[k] !== undefined) {
            newObj[k] = obj[k]
        }
    })
    return newObj
}

// cdn图片加瘦身后缀
export const slimCdnImg = (url: string): string => {
    const reg = /\?/g
    const result = reg.test(url)
    return url + (result ? '/imageslim' : '?imageslim')
}

//   复制内容
export const copyContent = (text: string): void => {
    const input = document.createElement('input')
    input.setAttribute('readonly', 'readonly')
    input.setAttribute('value', text)
    document.body.appendChild(input)
    input.select()
    // input.setSelectionRange(0, 9999);
    if (document.execCommand('copy')) {
        document.execCommand('copy')
        message.success('复制成功！')
    }
    document.body.removeChild(input)
}
