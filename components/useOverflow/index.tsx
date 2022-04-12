import {
    ref, watch, onBeforeUnmount 
} from 'vue'

import type { Ref } from 'vue'

export default function useOverflow(
    containerRef: Ref<HTMLElement>,
    contentRef: Ref<HTMLElement>
) {
    const overflow = ref(false)
    let resizeObserver: ResizeObserver | undefined

    const cleanup = () => {
        if (resizeObserver) {
            resizeObserver.unobserve(containerRef.value)
            resizeObserver = undefined
        }
    }

    const observer = () => {
        const container = containerRef.value
        const content = contentRef.value
        const containerWidth = container.getBoundingClientRect().width
        const contentWidth = content.getBoundingClientRect().width

        if (containerWidth !== 0) {
            if (contentWidth > containerWidth) {
                overflow.value = true
            } else {
                overflow.value = false
            }
        }
    }

    const stopWatch = watch(
        containerRef,
        (el) => {
            cleanup()

            if (el) {
                resizeObserver = new ResizeObserver(observer)
                resizeObserver.observe(el)
            }
        },
        { flush: 'post' }
    )

    onBeforeUnmount(() => {
        cleanup()
        stopWatch()
    })

    return overflow
}
