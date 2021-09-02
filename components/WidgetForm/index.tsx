import moment from 'moment'
import { createClasses } from 'vue3-emotion'
import {
    defineComponent,
    reactive,
    PropType,
    ref,
    onMounted,
    watch,
    toRaw,
} from 'vue'
import {
    Form,
    Input,
    InputNumber,
    Select,
    Cascader,
    DatePicker,
    Row,
    Radio,
    Checkbox,
    Switch,
} from 'ant-design-vue'
import {
    RangePickerPresetRange,
    RangePickerValue,
} from 'ant-design-vue/es/date-picker/interface'
import { FormProps } from 'ant-design-vue/es/form/Form'
import {
    get, isEqual 
} from 'lodash'
import { mockData } from './demoConfig'
import {
    TimeConfig,
    DataSourceItem,
    OptionItem,
    Cate,
    BtnConfigItem,
    WatchInitModel,
} from './interface'
import ProxyOption from './ProxyOption'
import { FORMAT_DATE } from '../_common/constant'
import { getCateFullPath } from './utils'
import Button from '../Button'

interface StateRef {
    modelRef: Record<string, any>
    rulesRef: Record<string, any>
}

const WidgetForm = defineComponent({
    name: 'WidgetForm',
    props: {
        dataSource: {
            type: Array as PropType<DataSourceItem[]>,
            default: mockData,
        },
        // 参照antd，model和rules自动生成，不需要传
        config: {
            type: Object as PropType<FormProps>,
            default: () => ({}),
        },
        /**
         * dataSource变化时，触发onInitModel方法。
         * 慎用！如onInitModel方法中有副作用，则会导致递归。
         * 一般情况，onInitModel与 watchInitModel 不共存
         * @desc 表单场景，编辑带入初值时 updateState: true
         * @property updateState 更新初始值
         * @property emitInitModel 触发onInitModel
         */
        watchInitModel: {
            type: Object as PropType<WatchInitModel>,
            default: () => ({
                updateState: false,
                emitInitModel: false,
            }),
        },
        onInitModel: {
            type: Function,
            default: () => {},
        },
        onChange: {
            type: Function,
            default: () => {},
        },
    },
    emits: ['update:value'] as string[],
    setup(props, { emit, expose }) {
        const stateRef: StateRef = reactive({
            modelRef: {},
            rulesRef: {},
        })
        // console.log('props :>> ', props);
        // set style
        const classRef = createClasses(() => ({
            rootCls: {
                '.ant-form-item-reset': {
                    marginBottom: '10px',
                },
                '.select-reset': {
                    minWidth: '160px',
                },
                '.input-reset': {
                    minWidth: '140px',
                    width: 'auto',
                },
                '.sep': {
                    width: '20px',
                    textAlign: 'center',
                    display: 'inline-block',
                },
                '.mr20': {
                    marginRight: '20px',
                },
                '.mr30': {
                    marginRight: '30px',
                },
            },
        }))
        const formRef = ref()

        const getRawModel = () => {
            const rawModel: Record<string, any> = {}
            const rawRules: Record<string, any> = {}
            props.dataSource.forEach((item) => {
                const { name, value, type, rules = [], isHidden } = item
                if (name && !isHidden) {
                    rawRules[name] = rules
                    if (Array.isArray(value)) {
                        if (type === 'rangePicker') {
                            const timeConfig: TimeConfig = {
                                momentDate: [],
                                dateString: [],
                                second: [],
                                msec: [],
                                daySecond: [],
                            }
                            value.forEach((dateVal: string | number) => {
                                const date = new Date(dateVal)
                                const msec = date.getTime()
                                const sec = Math.floor(msec / 1000)
                                const daySec = +moment(msec)
                                    .startOf('day')
                                    .format('X')

                                timeConfig.momentDate.push(
                                    moment(date, FORMAT_DATE.datetime)
                                )
                                timeConfig.dateString.push(
                                    moment(date, FORMAT_DATE.datetime).format(
                                        FORMAT_DATE.datetime
                                    )
                                )
                                timeConfig.second.push(sec)
                                timeConfig.msec.push(msec)
                                timeConfig.daySecond.push(daySec)
                            })
                            rawModel[name] = timeConfig
                        } else {
                            // 处理rangeInput 重置问题
                            rawModel[name] = [...value]
                        }
                    } else {
                        rawModel[name] = value
                    }
                }
            })
            // console.log('rawModel :>> ', rawModel);
            return {
                rawModel,
                rawRules,
            }
        }

        const initModelRef = () => {
            const { rawModel, rawRules } = getRawModel()
            Object.keys(rawModel).forEach((key) => {
                stateRef.modelRef[key] = rawModel[key]
                stateRef.rulesRef[key] = rawRules[key]
            })
        }
        // ref共享方法
        expose({
            initModelRef,
            validate: (payload?: string | string[]) => {
                return formRef.value.validate(payload)
            },
            validateFields: (payload?: string | string[]) => {
                return formRef.value.validateFields(payload)
            },
            clearValidate: (payload?: string | string[]) => {
                formRef.value.clearValidate(payload)
            },
        })

        const formItem = (item: Record<string, any>) => {
            const {
                name = '',
                eventName = '',
                compProps = {},
                selfProps = {},
                customRender: CustomRender,
            } = item
            const { type, fieldNames, deps = {}, options } = selfProps

            // const setEmits = (eName: string) => {
            //     if (!eName) {
            //         return
            //     }
            //     const evtIdx = WidgetForm.emits.findIndex((e) => e === eName)
            //     if (evtIdx === -1) {
            //         WidgetForm.emits.push(eName)
            //     }
            //     // console.log('WidgetForm :>> ', WidgetForm.emits)
            // }
            // setEmits(eventName)

            const getDeps = () => {
                const rawDepVal: string[] = []
                const { options: depOpt = [] } = deps
                depOpt.forEach((depKey: string) => {
                    if (stateRef.modelRef[depKey]) {
                        rawDepVal.push(stateRef.modelRef[depKey])
                    }
                })
                return rawDepVal
            }
            // v-model所需
            const onChange = (customEmit?: boolean) => {
                if (!customEmit) {
                    // console.log('customEmit :>> ', customEmit)
                    eventName && emit(eventName, stateRef.modelRef)
                }
                props.onChange(toRaw(stateRef.modelRef))
                emit('update:value', stateRef.modelRef)
            }

            const onRangePickerChange = (
                modelName: string,
                momentDate: RangePickerPresetRange,
                dateStr: string[]
            ) => {
                const dateString: string[] = []
                const second: number[] = []
                const msec: number[] = []
                const daySecond: number[] = []
                const momentDateObj =
                    typeof momentDate === 'function' ? momentDate() : momentDate
                momentDateObj.forEach((date: RangePickerValue[number], idx) => {
                    if (typeof date === 'string') {
                        date = moment(date, FORMAT_DATE.datetime)
                    }
                    // hack for moment date
                    const str = dateStr[idx]
                    date = moment(str, FORMAT_DATE.datetime)

                    const ms = +date.format('x')
                    const s = Math.floor(+date.format('X'))
                    const daySec = +date.startOf('day').format('X')
                    second.push(s)
                    msec.push(ms)
                    daySecond.push(daySec)
                    dateString.push(str)
                })
                stateRef.modelRef[modelName] = {
                    momentDate: momentDateObj,
                    dateString,
                    second,
                    msec,
                    daySecond,
                }
                // console.log(`${modelName} change`, stateRef.modelRef[modelName])
                onChange()
            }

            const onCustomChange = (val: unknown[]) => {
                // console.log('onCustomChange :>> ', val);
                stateRef.modelRef[name] = val
                onChange()
            }

            switch (item.type) {
            case 'customRender':
                return (
                    CustomRender && (
                        <CustomRender
                            allowClear
                            {...compProps}
                            onChange={onCustomChange}
                            value={stateRef.modelRef[name]}
                        />
                    )
                )
            case 'input':
                return (
                    <section>
                        {type === 'number' ? (
                            <InputNumber
                                class="input-reset"
                                precision={0}
                                min={0}
                                onChange={() => {
                                    onChange(false)
                                }}
                                {...compProps}
                                v-model={[stateRef.modelRef[name], 'value']}
                            />
                        ) : (
                            <Input
                                class="input-reset"
                                allowClear
                                onChange={() => {
                                    onChange(false)
                                }}
                                {...compProps}
                                v-model={[stateRef.modelRef[name], 'value']}
                            />
                        )}
                    </section>
                )
            case 'switch':
                return (
                    <Switch
                        onClick={() => {
                            onChange(false)
                        }}
                        {...compProps}
                        v-model={[stateRef.modelRef[name], 'checked']}
                    />
                )
            case 'checkbox':
                return (
                    <ProxyOption
                        options={options}
                        type={item.type}
                        deps={getDeps()}
                        fieldNames={fieldNames}
                    >
                        {{
                            default: (optionList: OptionItem[]) => {
                                return (
                                    <Checkbox.Group
                                        onChange={(val = []) => {
                                            if (eventName) {
                                                const rawData =
                                                        optionList.filter(
                                                            (
                                                                checked: OptionItem
                                                            ) => {
                                                                return val.includes(
                                                                    checked.value
                                                                )
                                                            }
                                                        )
                                                emit(
                                                    eventName,
                                                    rawData,
                                                    val,
                                                    stateRef.modelRef
                                                )
                                                onChange(true)
                                            }
                                        }}
                                        {...compProps}
                                        options={optionList}
                                        v-model={[
                                            stateRef.modelRef[name],
                                            'value',
                                            'trim',
                                        ]}
                                    />
                                )
                            },
                        }}
                    </ProxyOption>
                )
            case 'radio':
                return (
                    <ProxyOption
                        options={options}
                        type={item.type}
                        deps={getDeps()}
                        fieldNames={fieldNames}
                    >
                        {{
                            default: (optionList: OptionItem[]) => {
                                return (
                                    <Radio.Group
                                        onChange={(e: Event) => {
                                            if (eventName) {
                                                const val = get(
                                                    e,
                                                    'target.value',
                                                    ''
                                                )
                                                const rawData =
                                                        optionList.filter(
                                                            (
                                                                checked: OptionItem
                                                            ) => {
                                                                return (
                                                                    val ===
                                                                    checked.value
                                                                )
                                                            }
                                                        )
                                                emit(
                                                    eventName,
                                                    val,
                                                    rawData,
                                                    stateRef.modelRef
                                                )
                                                onChange(true)
                                            }
                                        }}
                                        {...compProps}
                                        v-model={[
                                            stateRef.modelRef[name],
                                            'value',
                                        ]}
                                    >
                                        {optionList.map(
                                            ({
                                                value,
                                                label,
                                            }: OptionItem) => (
                                                <span key={value}>
                                                    {type === 'button' && (
                                                        <Radio.Button
                                                            value={value}
                                                        >
                                                            {label}
                                                        </Radio.Button>
                                                    )}
                                                    {type === 'radio' && (
                                                        <Radio
                                                            value={value}
                                                        >
                                                            {label}
                                                        </Radio>
                                                    )}
                                                </span>
                                            )
                                        )}
                                    </Radio.Group>
                                )
                            },
                        }}
                    </ProxyOption>
                )
            case 'btnGroup':
                return (options || []).map(
                    ({
                        compProps: btnCompProps = {},
                        eventName: btnEvtName = '',
                        label = '',
                    }: BtnConfigItem) => {
                            // setEmits(btnEvtName)
                        return (
                            <Button
                                class="mr20"
                                key={label}
                                {...btnCompProps}
                                onClick={() => {
                                    btnEvtName &&
                                            emit(btnEvtName, stateRef.modelRef)
                                    console.log(
                                        'stateRef.modelRef :>> ',
                                        stateRef.modelRef
                                    )
                                }}
                            >
                                {label}
                            </Button>
                        )
                    }
                )
            case 'cascader':
                return (
                    <ProxyOption
                        options={options}
                        type={item.type}
                        deps={getDeps()}
                    >
                        {{
                            default: (optionList: Cate[]) => {
                                const len = get(
                                    stateRef,
                                    `modelRef[${name}].length`
                                )
                                if (len === 1) {
                                    const secCate = get(
                                        stateRef.modelRef,
                                        `${name}[0]`
                                    )
                                    const arr = getCateFullPath(
                                        optionList,
                                        secCate
                                    )
                                    if (arr.length > 0) {
                                        stateRef.modelRef[name] = arr
                                    }
                                }
                                return (
                                    <Cascader
                                        onChange={() => {
                                            onChange(false)
                                        }}
                                        {...compProps}
                                        options={optionList}
                                        v-model={[
                                            stateRef.modelRef[name],
                                            'value',
                                        ]}
                                    />
                                )
                            },
                        }}
                    </ProxyOption>
                )
            case 'select':
                return (
                    <ProxyOption
                        options={options}
                        type={item.type}
                        deps={getDeps()}
                        fieldNames={fieldNames}
                    >
                        {{
                            default: (optionList: OptionItem[]) => (
                                <Select
                                    class="select-reset"
                                    onChange={() => {
                                        onChange(false)
                                    }}
                                    allowClear
                                    {...compProps}
                                    v-model={[
                                        stateRef.modelRef[name],
                                        'value',
                                    ]}
                                >
                                    {optionList.map(({ value, label }) => (
                                        <Select.Option
                                            key={value}
                                            value={value}
                                        >
                                            {label}
                                        </Select.Option>
                                    ))}
                                </Select>
                            ),
                        }}
                    </ProxyOption>
                )
            case 'rangePicker': {
                const momentDate = get(
                    stateRef,
                    `modelRef.${name}.momentDate`
                )
                return (
                    momentDate && (
                        <DatePicker.RangePicker
                            showTime={{
                                defaultValue: [
                                    moment('00:00:00', FORMAT_DATE.time),
                                    moment('23:59:59', FORMAT_DATE.time),
                                ],
                            }}
                            format={FORMAT_DATE.datetime}
                            style={{ width: '380px' }}
                            {...compProps}
                            value={stateRef.modelRef[name].momentDate}
                            onChange={(momentDateObj, dateString) => {
                                onRangePickerChange(
                                    name,
                                    momentDateObj,
                                    dateString
                                )
                            }}
                        />
                    )
                )
            }
            case 'rangeInput': {
                const [minProps = {}, maxProps = {}] = compProps
                if (!Array.isArray(stateRef.modelRef[name])) {
                    return null
                }
                return (
                    <section>
                        {type === 'input' && (
                            <Input
                                class="input-reset"
                                allowClear
                                onChange={() => {
                                    onChange(false)
                                }}
                                {...minProps}
                                v-model={[
                                    stateRef.modelRef[name][0],
                                    'value',
                                ]}
                            />
                        )}
                        {type === 'number' && (
                            <InputNumber
                                class="input-reset"
                                precision={0}
                                min={0}
                                onChange={() => {
                                    onChange(false)
                                }}
                                {...minProps}
                                v-model={[
                                    stateRef.modelRef[name][0],
                                    'value',
                                ]}
                            />
                        )}
                        <span class="sep">~</span>
                        {type === 'input' && (
                            <Input
                                class="input-reset"
                                allowClear
                                onChange={() => {
                                    onChange(false)
                                }}
                                {...maxProps}
                                v-model={[
                                    stateRef.modelRef[name][1],
                                    'value',
                                ]}
                            />
                        )}
                        {type === 'number' && (
                            <InputNumber
                                class="input-reset"
                                precision={0}
                                min={0}
                                onChange={() => {
                                    onChange(false)
                                }}
                                {...maxProps}
                                v-model={[
                                    stateRef.modelRef[name][1],
                                    'value',
                                ]}
                            />
                        )}
                    </section>
                )
            }
            default:
                return null
            }
        }

        const initData = (emitInitModel = false) => {
            const { rawModel } = getRawModel()
            if (props.watchInitModel.updateState) {
                initModelRef()
                console.log('initModelRef')
            }
            if (emitInitModel || props.watchInitModel.emitInitModel) {
                props.onInitModel(rawModel)
                console.log('onInitModel')
            }
        }

        watch(
            () => props.dataSource,
            (curDataSource, preDataSource) => {
                if (!isEqual(curDataSource, preDataSource)) {
                    initData()
                }
            }
        )

        onMounted(() => {
            initModelRef()
            initData(true)
        })

        const { rootCls } = classRef.value
        return () => (
            <Form
                layout="inline"
                class={rootCls}
                {...props.config}
                model={stateRef.modelRef}
                rules={stateRef.rulesRef}
                ref={formRef}
            >
                {props.dataSource.map((item) => {
                    const {
                        formItemLabel,
                        name = '',
                        isHidden,
                        extraRender = {},
                        formItemProps = {},
                    } = item
                    return (
                        !isHidden && (
                            <Form.Item
                                class="ant-form-item-reset mr30"
                                key={`${formItemLabel}`}
                                name={name}
                                label={formItemLabel}
                                {...formItemProps}
                            >
                                {formItem(item)}
                                <Row>
                                    {extraRender.tips && <extraRender.tips />}
                                </Row>
                            </Form.Item>
                        )
                    )
                })}
            </Form>
        )
    },
})

export default WidgetForm

export * from './interface'
