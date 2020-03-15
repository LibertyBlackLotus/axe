<template>
  <div class="s-tab-wrap" :class="{'is-active':isActive}">
    <div class="s-tab-panel">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 's-tab',
  inject: ['$tabs'],
  props: {
    // 导航标题
    title: {
      type: String,
      default: ''
    },
    // 是否禁用导航
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      info: {
        id: 's-tab-id-' + Math.random().toString(36).substr(2),
        title: this.title,
        isDisabled: this.disabled
      }
    };
  },
  computed: {
    isActive () {
      return this.$tabs.navList[this.$tabs.value].id === this.info.id;
    }
  },
  watch: {
    title () {
      this.info.title = this.title;
    },
    disabled () {
      this.info.isDisabled = this.disabled;
    }
  },
  created () {
    this.$tabs.navList = this.$tabs.navList.concat(this.info);
  },
  beforeDestroy () {
    this.$tabs.navList = this.$tabs.navList.filter(item => item.id !== this.info.id);
  }
};
</script>

<style lang="scss">
.s-tab-wrap {
  width: 100%;
  height: 0;
  font-size: 28rpx;
  flex-shrink: 0;
  white-space: normal;
  overflow: hidden;
  box-sizing: border-box;
  &.is-active {
    height: auto;
    overflow: visible;
  }
}
</style>
