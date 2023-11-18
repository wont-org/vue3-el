import {
  Story, Meta 
} from '@storybook/vue3'
import {
  reactive, defineComponent 
} from 'vue'
import PuzzleCaptcha from './index.tsx'
// import PuzzleCaptcha from './index.vue'

export default {
  title: 'Template/PuzzleCaptcha',
  component: PuzzleCaptcha,
} as Meta

const state = reactive({
  visible: false,
})

const Template: Story = (args) =>
  defineComponent({
    name: 'PuzzleCaptchaFront',
    setup() {
      return () => {
        return (
          <section>
            <button
              type="button"
              onClick={() => (state.visible = true)}
            >
                            点击验证
            </button>
            <PuzzleCaptcha {...args} visible={state.visible} />
          </section>
        )
      }
    },
  })

export const Default = Template.bind({})
Default.args = {
  useFetch: false,
  useMask: true,
  onFail() {
    console.log('onFail')
  },
  onClose() {
    console.log('onClose')
    state.visible = false
  },
  onSuccess() {
    console.log('onSuccess')
    state.visible = false
  },
}
