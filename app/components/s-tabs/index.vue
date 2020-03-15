<template>
  <div class="s-tabs" :class="customClass">
    <div class="s-tabs-nav-wrap" :style="'height:'+height+'rpx'">
      <scroll-view
        class="scroll-wrap"
        :show-scrollbar="false"
        scroll-with-animation
        scroll-x
        :scroll-left="scrollLeft"
      >
        <div class="scroll-view">
          <ul class="s-tab-nav-view">
            <li
              v-for="(item,index) in navList"
              :class="['s-tab-nav',{'is-disabled':item.isDisabled},{'is-active':value==index}]"
              :style="{
            width:navWidth,
            color:value==index?activeColor:color
          }"
              :key="index"
              @click="navClick(index,item)"
              v-html="item.title"
            ></li>
          </ul>
          <div
            v-if="line"
            class="s-tab-line"
            :style="{
            width:lineWidth+'px',
            height:lineHeight+'rpx',
            background:lineColor,
            transform:'translateX('+lineLeft+'px)'
          }"
          ></div>
        </div>
      </scroll-view>
    </div>
    <div class="s-tabs-content-wrap" :style="transform + transition">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 's-tabs',
  props: {
    // class
    customClass: {
      type: String,
      default: ''
    },
    // v-model双向绑定
    value: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#333'
    },
    activeColor: {
      type: String,
      default: '#406BDC'
    },
    // 标签栏高度 rpx
    height: {
      type: Number,
      default: 80
    },
    // 自适应宽度还是百分比等分
    navPerView: {
      type: [Number, String],
      default: 'auto'
    },
    // 内容部分是否动画切换
    effect: {
      type: Boolean,
      default: false
    },
    // 内容部分动画切换时间
    duration: {
      type: Number,
      default: 0.3
    },
    // 是否显示底部条
    line: {
      type: Boolean,
      default: true
    },
    // 底部条颜色
    lineColor: {
      type: String,
      default: '#406BDC'
    },
    // 底部条高度 rpx
    lineHeight: {
      type: Number,
      default: 4
    },
    // 底部条宽度相对于标签宽度比例
    lineScale: {
      type: Number,
      default: 0.6
    }
  },
  data () {
    return {
      diffLeft: 0,
      scrollLeft: 0,
      lineWidth: 0,
      lineLeft: 0,
      navList: []
    };
  },
  computed: {
    navWidth () {
      const perView = parseInt(this.navPerView);
      return isNaN(perView) ? 'auto' : 100 / perView + '%';
    },
    transform () {
      return `transform: translate3d(${-100 * this.value}%, 0, 0);`;
    },
    transition () {
      return this.effect ? `transition-duration: ${this.duration}s;` : '';
    }
  },
  provide () {
    return {
      $tabs: this
    };
  },
  watch: {
    value (index) {
      this.$emit('change', index);
      this.refreshNavScroll();
    }
  },
  methods: {
    navClick (index, item) {
      if (index !== this.value && !item.isDisabled) {
        this.$emit('input', index);
      }
    },
    refreshNavScroll (isInit) {
      this.$nextTick(() => {
        const query = () => uni.createSelectorQuery().in(this);
        query().select('.s-tabs-nav-wrap').boundingClientRect().exec(([wrap]) => {
          query().select('.s-tab-nav-view').boundingClientRect().exec(([view]) => {
            if (isInit) {
              this.diffLeft = view.left - wrap.left;
            }
            query().selectAll('.s-tab-nav').boundingClientRect().exec(([list]) => {
              if (list.length) {
                const item = list[this.value];
                const centerLeft = (wrap.width - item.width) / 2;

                this.scrollLeft = Math.abs(view.left - wrap.left - this.diffLeft) + (item.left - centerLeft - wrap.left);

                this.lineWidth = item.width * this.lineScale;
                this.lineLeft = this.scrollLeft + centerLeft + (item.width - this.lineWidth) / 2;
              }
            });
          });
        });
      });
    }
  },
  mounted () {
    this.refreshNavScroll(true);
  }
};
</script>

<style lang="scss">
.s-tabs {
  width: 100%;
  position: relative;
  overflow-x: hidden;
  &-nav-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    white-space: nowrap;
    .scroll-wrap {
      height: 100%;
      ::-webkit-scrollbar {
        display: none;
      }
      // #ifdef H5
      /deep/ {
        & .uni-scroll-view > div {
          height: 100%;
        }
      }
      // #endif
    }
    .scroll-view {
      height: 100%;
      position: relative;
    }
    .s-tab-nav-view {
      height: 100%;
    }
  }
  .s-tab-nav {
    display: inline-flex;
    height: 100%;
    font-size: 28rpx;
    padding: 0 30rpx;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
    cursor: pointer;
    &.is-disabled {
      color: #c8c9cc !important;
      cursor: not-allowed;
    }
  }
  .s-tab-line {
    position: absolute;
    bottom: 0;
    border-radius: 6rpx;
    transition: all 0.3s;
  }
  &-content-wrap {
    display: flex;
    white-space: nowrap;
    s-tab {
      width: 100%;
      flex-shrink: 0;
      box-sizing: border-box;
    }
  }
}
</style>
