/*
 * @Author: ganlan
 * @Date: 2021-03-22 10:57:41
 * @Description:
 */

import {
    defineComponent, reactive 
} from 'vue'
import { Modal } from 'ant-design-vue'
import { IMG } from '../_common/constant'

export default defineComponent({
    name: 'ViewVideo',
    props: {
        src: {
            type: String,
            required: true,
        },
        // 封面图
        imgSrc: {
            type: String,
            default: '',
        },
        imgSubfix: {
            type: String,
            default: '?vframe/jpg/offset/0',
        },
    },
    setup(props) {
        const autoGenCover = props.imgSubfix
            ? `${props.src}${props.imgSubfix}`
            : ''

        const state = reactive({
            visible: false,
            imgUrl: props.imgSrc || autoGenCover || IMG.default,
        })

        const handleClose = () => {
            state.visible = false
        }
        const viewVideo = () => {
            state.visible = true
        }

        return () => {
            return (
                <div style={{ display: 'inline-block', marginRight: '8px' }}>
                    <img
                        style={{
                            width: '100px',
                            height: '100px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            padding: '2px',
                            boxSizing: 'border-box',
                        }}
                        src={state.imgUrl || IMG.default}
                        onError={() => {
                            state.imgUrl = IMG.default
                        }}
                        alt="视频封面"
                        onClick={viewVideo}
                        role="presentation"
                    />
                    <Modal
                        visible={state.visible}
                        title="查看视频"
                        footer={null}
                        onCancel={handleClose}
                        width="60%"
                    >
                        <video
                            src={props.src}
                            controls
                            style={{ width: '100%' }}
                        >
                            <track default kind="captions" />
                            Sorry, your browser not support embedded videos.
                        </video>
                    </Modal>
                </div>
            )
        }
    },
})
