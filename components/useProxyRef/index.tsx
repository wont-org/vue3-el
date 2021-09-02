import {
    getCurrentInstance, proxyRefs 
} from 'vue'

export default function useProxyRef(map: Record<string, unknown> = {}): void {
    const instance: any = getCurrentInstance()

    let state = map

    if (instance.setupState && typeof instance.setupState === 'object') {
        state = {
            ...instance.setupState,
            ...state,
        }
    }

    instance.setupState = proxyRefs(state)
}
