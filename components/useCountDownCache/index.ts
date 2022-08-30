import {
    onMounted, reactive, ref, readonly 
} from 'vue'
import cache from './cache'

export default function useCountDownCache({ unique = false } = {}) {
    const state = reactive({
        count: 0,
    })

    let endTime = 0
    let isFirstCountDown = true

    const getCountDownText = () => {
        const initCountDownText = isFirstCountDown ? '获取验证码' : '重新获取'
        return state.count <= 0 ? initCountDownText : `${state.count}s后获取`
    }

    const countDisabledRef = ref(false)

    const countDown = (sec = 10, endTimeKey = 'refreshEndTime') => {
        const now = Date.now()
        let timer = null
        const cacheEndTime = Number(cache.get(endTimeKey))

        // 点击开始倒计时
        if (countDisabledRef.value && cacheEndTime < Date.now()) {
            state.count = sec
            endTime = now + 1000 * sec
            cache.set(endTimeKey, endTime)
        } else {
            // 刷新页面
            endTime = cacheEndTime
            state.count = Math.ceil((cacheEndTime - Date.now()) / 1000)
        }

        if (timer) {
            clearInterval(timer)
        } else {
            timer = setInterval(() => {
                if (now >= endTime) {
                    state.count = 0
                    clearInterval(timer)
                } else {
                    state.count = Math.ceil(
                        (Number(cache.get(endTimeKey)) - Date.now()) / 1000
                    )
                    isFirstCountDown = false
                    if (state.count <= 0) {
                        state.count = 0
                        clearInterval(timer)
                    }
                }
            }, 1000)
        }
    }

    onMounted(() => {
        if (!unique) {
            countDown()
        }
    })

    return {
        countDown,
        getCountDownText,
        countDisabledRef,
        state: readonly(state),
    }
}
