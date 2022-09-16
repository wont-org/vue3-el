<template>
  <section
    v-show="useMask && visible || !useMask"
  >
    <div
      :class="[
        'puzzle-captcha-mask',
        {
          visible: useMask && visible
        }
      ]"
      @click="onClose"
    />
    <div
      :class="[
        'puzzle-captcha-body',
        {
          'puzzle-captcha-center': useMask,
        }
      ]"
    >
      <div class="title-wrap">
        <h1 class="title">
          {{ title }}
        </h1>
        <img src="./reset.png" @click="handleReset" class="reset">
      </div>
      <div
        :class="[
          'canvas-wrap'
        ]"
        :style="`width: ${width}px;height: ${height}px`"
      >
        <div v-show="state.loading" class="loading">
          <i class="qax-icon-Loading" />
        </div>
        <canvas
          ref="bgCanvasRef"
          class="bg"
          :width="width"
          :height="height"
        />
        <canvas
          ref="gapCanvasRef"
          class="gap"
          :width="width"
          :height="height"
          :style="`transform: translateX(${trail.x * ratio}px);`"
        />
        <p
          :class="[
            'result-tip',
            {
              'result-visible': state.resultMsg,
              'success-tip': state.valid,
              'fail-tip': !state.valid,
            }]"
        >
          {{ state.resultMsg }}
        </p>
      </div>
      <div class="slider-wrap">
        <div
          :class="[
            'slider',
            {
              'slider-drag': state.isMoving,
            }
          ]"
          :style="`transform: translateX(${trail.x}px);`"
          @mousedown="handleMoveBegin"
        >
          <i class="qax-icon-Double-angle-right" />
        </div>
        <div class="slider-path" :style="`width: ${trail.x + DRAG_WIDTH}px`" />
        <span v-show="trail.x <= 0" class="slider-tip">{{ sliderTip }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { getImg, sleep, getRandom, isFirefox } from './utils';

import './index1.less'

export default defineComponent({
  name: 'PuzzleCaptcha',
  props: {
    /**
     * 宽
     */
    width: {
      type: Number,
      default: 320,
    },
    /**
     * 高
     */
    height: {
      type: Number,
      default: 180,
    },
    /**
     * 是否使用蒙层
     */
    useMask: {
      type: Boolean,
      default: true,
    },
    /**
     * 是否展示
     */
    visible: {
      type: Boolean,
      default: true,
    },
    /**
     * 顶部标题
     */
    title: {
      type: String,
      default: '安全验证',
    },
    /**
     * 滑动前，滑动条提示文案
     */
    sliderTip: {
      type: String,
      default: '滑动完成拼图',
    },
    /**
     * 验证成功提示文案
     */
    successMsg: {
      type: String,
      default: '验证通过',
    },
    /**
     * 验证失败提示文案
     */
    failMsg: {
      type: String,
      default: '验证失败，请重试'
    },
    /**
     * 验证成功后的回调
     */
    onSuccess: {
      type: Function,
      default: ()=> void {},
    },
    /**
     * 验证失败后的回调
     */
    onFail: {
      type: Function,
      default: ()=> void {},
    },
    /**
     * `useMask`为`true`的情况下，点击蒙层关闭的回调
     */
    onClose: {
      type: Function,
      default: ()=> void {},
    },
    /**
     * 是否是和后端交互
     */
    useFetch: {
      type: Boolean,
      default: false,
    },
    /**
     * `useFetch`为`true`的情况下生效，请求图片资源和y轴偏移量。详见组件示例-前后端验证
     */
    fetchData: {
      type: Function,
      default: ()=> void {},
    },
    /**
     * `useFetch`为`true`的情况下生效，请求后端接口去校验，返回布尔值。详见组件示例-前后端验证
     */
    validator: {
      type: Function,
      default: ()=> void {},
    },
    /**
     * `useFetch`为`false`的情况下生效。校验x轴偏移量的误差，值越小越准确
     */
    validateOffsetX: {
      type: Number,
      default: 10,
    },
  },
  setup (props) {
    const GAP_WIDTH = 50;
    const DRAG_WIDTH = 26;
    // 缺口 阴影
    const GAP_SHADOW_BLUR = 3;
    // 拼图和滑块的比例
    const ratio = (props.width - GAP_WIDTH) / (props.width - DRAG_WIDTH);
    // 随机x y左标
    let coord = {
      x: 0,
      y: 0,
    };

    let initData = {
      bgImg: '',
      gapImg: '',
      y: 0,
    };

    const bgCanvasRef = ref();
    const gapCanvasRef = ref();
    let bgCtx = null;
    let gapCtx = null;
    let disabled = false;
    let origin = {
      x: 0,
    };
    const trail = ref({
      x: 0,
    });
    const state = reactive({
      valid: false,
      resultMsg: '',
      isMoving: false,
      loading: false,
    });

    const draw = ()=> {
      // 缺口背景
      bgCtx = bgCanvasRef.value.getContext('2d');
      bgCtx.clearRect(0, 0, props.width, props.height);
      // 缺口本身
      gapCtx = gapCanvasRef.value.getContext('2d');
      gapCtx.clearRect(0, 0, props.width, props.height);

      const image = new Image(props.width, props.height);
      image.src = initData.bgImg;
      image.onload = ()=> {
        bgCtx.save();
        if (!props.useFetch) {
          drawBgAndGapBg(image);
          state.loading = false;
        } else {
          bgCtx.drawImage(image, 0, 0, props.width, props.height);
        }
      };
    };
    // 前端实现
    const drawBgAndGapBg = (image)=> {
      genRandomXY();
      drawGap(bgCtx);
      // 取黑色阴影
      if (!isFirefox) {
        bgCtx.shadowOffsetX = 0;
        bgCtx.shadowOffsetY = 0;
        bgCtx.shadowColor = '#000';
        bgCtx.shadowBlur = GAP_SHADOW_BLUR;
        bgCtx.fill();
        bgCtx.clip();
      } else {
        bgCtx.clip();
        bgCtx.save();
        bgCtx.shadowOffsetX = 0;
        bgCtx.shadowOffsetY = 0;
        bgCtx.shadowColor = '#000';
        bgCtx.shadowBlur = GAP_SHADOW_BLUR;
        bgCtx.fill();
      }
      // 先在背景画缺口
      bgCtx.drawImage(image, 0, 0, props.width, props.height);
      bgCtx.restore();
      const imgData = bgCtx.getImageData(
        0,
        0,
        props.width,
        props.height,
      );
      // 复制背景图到缺口图
      gapCtx.putImageData(imgData, props.width,  props.height);
      // 填充缺口图画布
      gapCtx.drawImage(
        bgCanvasRef.value,
        0 - coord.x + GAP_SHADOW_BLUR,
        0,
        props.width, props.height,
      );
      bgCtx.restore();

      // 重置背景
      bgCtx.clearRect(0, 0, props.width,  props.height);

      // 重新画缺口
      bgCtx.save();
      drawGap(bgCtx);
      bgCtx.globalAlpha = 0.8;
      bgCtx.fillStyle = '#fff';
      bgCtx.fill();
      bgCtx.restore();

      // 缺口的内白色阴影
      bgCtx.save();
      bgCtx.globalCompositeOperation = 'source-atop';
      drawGap(bgCtx);
      bgCtx.arc(
        coord.x + GAP_WIDTH / 2,
        coord.y + GAP_WIDTH / 2,
        GAP_WIDTH * 2,
        0,
        Math.PI * 2,
        true
      );
      bgCtx.shadowColor = '#000';
      bgCtx.shadowOffsetX = 2;
      bgCtx.shadowOffsetY = 2;
      bgCtx.shadowBlur = GAP_WIDTH / 3;
      bgCtx.fill();
      bgCtx.restore();

      // 原图
      bgCtx.save();
      bgCtx.globalCompositeOperation = 'destination-over';
      bgCtx.drawImage(image, 0, 0, props.width, props.height);
      bgCtx.restore();
    };
    // 后端实现
    const drawGapBgByFetch = ()=> {
      if (props.useFetch) {
        const image = new Image(props.width, props.height);
        image.crossOrigin = 'anonymous';
        image.src = initData.gapImg;
        image.onload = ()=> {
          gapCtx.drawImage(image, 0, initData.y);
        };
      }
    };

    const genRandomXY = ()=> {
      coord = {
        x: getRandom(GAP_WIDTH + 20, props.width - GAP_WIDTH - 20),
        y: getRandom(20, props.height - GAP_WIDTH - 20),
      };
    };

    // 缺口路径
    const drawGap = (ctx)=> {
      const gapOneThirdWidth = GAP_WIDTH / 4;
      const r = gapOneThirdWidth / 2;
      // 从左上角开始画
      ctx.beginPath();
      ctx.moveTo(coord.x, coord.y);
      ctx.lineTo(coord.x + gapOneThirdWidth, coord.y);
      ctx.arcTo(
        coord.x + gapOneThirdWidth,
        coord.y - r,
        coord.x + gapOneThirdWidth + r,
        coord.y - r,
        r,
      );
      ctx.arcTo(
        coord.x + gapOneThirdWidth + gapOneThirdWidth,
        coord.y - gapOneThirdWidth / 2,
        coord.x + gapOneThirdWidth + gapOneThirdWidth,
        coord.y,
        gapOneThirdWidth / 2
      );
      ctx.lineTo(coord.x + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth, coord.y);
      // 右上
      ctx.lineTo(coord.x + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth, coord.y + gapOneThirdWidth);
      ctx.arcTo(
        coord.x + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth / 2,
        coord.y + gapOneThirdWidth,
        coord.x + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth / 2,
        coord.y + gapOneThirdWidth + gapOneThirdWidth / 2,
        gapOneThirdWidth / 2
      );
      ctx.arcTo(
        coord.x + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth / 2,
        coord.y + gapOneThirdWidth + gapOneThirdWidth,
        coord.x + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth,
        coord.y + gapOneThirdWidth + gapOneThirdWidth,
        gapOneThirdWidth / 2
      );
      ctx.lineTo(
        coord.x + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth,
        coord.y + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth
      );
      // 右下
      ctx.lineTo(coord.x, coord.y + gapOneThirdWidth + gapOneThirdWidth + gapOneThirdWidth);
      ctx.lineTo(coord.x, coord.y + gapOneThirdWidth + gapOneThirdWidth);

      ctx.arcTo(
        coord.x + gapOneThirdWidth / 2,
        coord.y + gapOneThirdWidth + gapOneThirdWidth,
        coord.x + gapOneThirdWidth / 2,
        coord.y + gapOneThirdWidth + gapOneThirdWidth / 2,
        gapOneThirdWidth / 2
      );
      ctx.arcTo(
        coord.x + gapOneThirdWidth / 2,
        coord.y + gapOneThirdWidth,
        coord.x,
        coord.y + gapOneThirdWidth,
        gapOneThirdWidth / 2
      );
      ctx.lineTo(coord.x, coord.y);
      // 左下 闭合
      ctx.closePath();
    };

    const handleMoveBegin = (e)=> {
      if (disabled) {
        return;
      }
      state.isMoving = true;
      origin = {
        x: e.clientX || e.touches?.[0]?.clientX || 0,
      };
    };
    const handleMove = (e)=> {
      if (!state.isMoving) {
        return;
      }
      const move = {
        x: (e.clientX || e.touches?.[0]?.clientX || 0) - origin.x,
      };
      const gapMaxSlideWidth = props.width - DRAG_WIDTH;
      if (move.x > gapMaxSlideWidth) {
        move.x = gapMaxSlideWidth;
      }
      if (move.x < 0) {
        move.x = 0;
      }
      trail.value = move;
    };
    const handleEnd = async()=> {
      if (!state.isMoving) {
        return;
      }
      state.isMoving = false;
      if (trail.value.x <= 0) {
        return;
      }
      await validator();
    };
    // 前端校验
    const validResult = ()=> {
      const x = trail.value.x * ratio;
      return Math.abs(coord.x - x) < props.validateOffsetX;
    };

    const validator = async()=> {
      let valid = false;
      if (!props.useFetch) {
        valid = validResult();
      } else {
        valid = await props.validator?.({
          x: Math.ceil(trail.value.x * ratio),
        });
      }
      state.valid = valid;
      disabled = true;
      if (valid) {
        state.resultMsg = props.successMsg;
        await sleep(800);
        props.onSuccess?.();
      } else {
        state.resultMsg = props.failMsg;
        await sleep(800);
        props.onFail?.();
        handleReset();
      }
    };

    const handleReset = async()=> {
      state.loading = false;
      state.resultMsg = '';
      trail.value = {
        x: 0,
      };
      state.isMoving = false;
      await init();
      disabled = false;
    };

    const init = async()=> {
      state.loading = true;
      if (props.useFetch) {
        initData = await props.fetchData?.() || initData;
        state.loading = false;
        drawGapBgByFetch();
      } else {
        const img = getImg(props.width, props.height);
        initData.bgImg = img;
      }
      draw();
    };

    watch(
      ()=> props.visible,
      (val)=> {
        if (val) {
          handleReset();
        }
      }
    );

    onMounted(()=> {
      if (!props.useMask) {
        handleReset();
      }
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
    });

    onBeforeUnmount(()=> {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
    });

    return {
      // const
      ratio,
      DRAG_WIDTH,
      // reactive
      bgCanvasRef,
      gapCanvasRef,
      trail,
      state,
      // func
      handleMoveBegin,
      handleMove,
      handleEnd,
      handleReset,
    };
  }
});
</script>
