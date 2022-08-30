import {
    reactive, ref, readonly 
} from 'vue'

const useCountDown = () => {
    const state = reactive({
        count: 0,
    })

    let isFirstCountDown = true

    const getCountDownText = () => {
        const initCountDownText = isFirstCountDown ? '获取验证码' : '重新获取'
        return state.count <= 0 ? initCountDownText : `${state.count}s后获取`
    }

    const countDisabledRef = ref(false)

    const countDown = (sec = 60) => {
        const now = Date.now()
        const endTime = now + 1000 * sec
        let timer = null

        state.count = sec

        if (timer) {
            clearInterval(timer)
        } else {
            timer = setInterval(() => {
                if (Date.now() >= endTime) {
                    state.count = 0
                    clearInterval(timer)
                } else {
                    state.count = Math.ceil((endTime - Date.now()) / 1000)
                    isFirstCountDown = false
                    if (state.count <= 0) {
                        state.count = 0
                        clearInterval(timer)
                    }
                }
            }, 1000)
        }
    }

    return {
        countDown,
        getCountDownText,
        countDisabledRef,
        state: readonly(state),
    }
}

export default useCountDown
