import type { PropType } from 'vue'

export interface FetchInitData {
  bgImg: string
  gapImg: string
  y: number
}

type VoidFn = () => void
type PromiseBoolFn = ({ x: number }) => Promise<boolean>
type PromiseFetchDataFn = () => Promise<FetchInitData | undefined>

export const props = {
  width: {
    type: Number as PropType<number>,
    default: 320,
  },
  height: {
    type: Number as PropType<number>,
    default: 180,
  },
  useMask: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  visible: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  title: {
    type: String as PropType<string>,
    default: '安全验证',
  },
  sliderTip: {
    type: String as PropType<string>,
    default: '滑动完成拼图',
  },
  successMsg: {
    type: String as PropType<string>,
    default: '验证通过',
  },
  failMsg: {
    type: String as PropType<string>,
    default: '验证失败，请重试',
  },
  onSuccess: {
    type: Function as PropType<VoidFn>,
    default: () => {},
  },
  onFail: {
    type: Function as PropType<VoidFn>,
    default: () => {},
  },
  onClose: {
    type: Function as PropType<VoidFn>,
    default: () => {},
  },
  useFetch: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  // useFetch-true effect
  fetchData: {
    type: Function as PropType<PromiseFetchDataFn>,
    default: () => {},
  },
  // useFetch-true effect
  validator: {
    type: Function as PropType<PromiseBoolFn>,
    default: () => {},
  },
}
