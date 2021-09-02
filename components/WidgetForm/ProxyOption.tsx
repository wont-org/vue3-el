import {
    defineComponent, onBeforeMount, reactive, watch, PropType 
} from 'vue'
import { isEqual } from 'lodash'
import { formatOptions } from './utils'
import { FieldNames } from './interface'

export default defineComponent({
    name: 'ProxyOption',
    props: {
        options: {
            type: [Array, Function],
            default: () => [],
            // required: true,
        },
        deps: {
            type: Array,
            default: () => [],
        },
        type: {
            type: String,
            default: '',
        },
        fieldNames: {
            type: Object as PropType<FieldNames>,
            default: () => ({
                value: 'value',
                label: 'label',
            }),
        },
    },
    setup(props, { slots }) {
        // console.log('props :>> ', props);
        const modelRef = reactive({
            options: [],
        })

        const updateOptions = async () => {
            let optionsList = []
            if (typeof props.options === 'function') {
                optionsList = (await props.options()) || []
            } else {
                optionsList = props.options || []
            }
            if (
                props.type !== 'cascader' &&
                props.fieldNames &&
                Array.isArray(optionsList) &&
                optionsList.length > 0
            ) {
                optionsList = formatOptions(optionsList, props.fieldNames)
            }
            modelRef.options = optionsList
            // console.log('modelRef.options :>> ', modelRef.options)
        }

        watch(
            () => [props.deps, props.options],
            async ([curDeps, curOpt], [preDeps, preOpt]) => {
                if (!isEqual(curDeps, preDeps)) {
                    console.log('deps update')
                    await updateOptions()
                } else if (!isEqual(curOpt, preOpt)) {
                    console.log('opt update')
                    await updateOptions()
                }
            }
        )

        onBeforeMount(async () => {
            await updateOptions()
        })

        return () => {
            return (
                <div>
                    {typeof slots.default === 'function'
                        ? slots.default(modelRef.options)
                        : null}
                </div>
            )
        }
    },
})
