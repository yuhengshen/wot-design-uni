<template>
  <view :class="['wd-badge', customClass]" :style="customStyle">
    <slot></slot>
    <view
      v-if="shouldShowBadge"
      :class="['wd-badge__content', 'is-fixed', type ? 'wd-badge__content--' + type : '', isDot ? 'is-dot' : '']"
      :style="contentStyle"
    >
      {{ content }}
    </view>
  </view>
</template>
<script lang="ts">
export default {
  name: 'wd-badge',
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared'
  }
}
</script>
<script lang="ts" setup>
import { computed, type CSSProperties } from 'vue'
import { badgeProps } from './types'
import { addUnit, isDef, isNumber, objToStyle } from '../common/util'
import { useDirection } from '../composables'

const props = defineProps(badgeProps)

const { isRtl } = useDirection()

const content = computed(() => {
  const { modelValue, max, isDot } = props
  if (isDot) return ''
  let value = modelValue
  if (value && max && isNumber(value) && !Number.isNaN(value) && !Number.isNaN(max)) {
    value = max < value ? `${max}+` : value
  }
  return value
})

const contentStyle = computed(() => {
  const style: CSSProperties = {}
  if (isDef(props.bgColor)) {
    style.backgroundColor = props.bgColor
  }

  if (isDef(props.top)) {
    style.top = addUnit(props.top)
  }

  if (isDef(props.right)) {
    if (isRtl.value) {
      style.left = addUnit(props.right)
    } else {
      style.right = addUnit(props.right)
    }
  }
  return objToStyle(style)
})

// 是否展示徽标数字
const shouldShowBadge = computed(() => !props.hidden && (content.value || (content.value === 0 && props.showZero) || props.isDot))
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>

<style lang="scss">
.wd-direction-rtl .wd-badge__content.is-fixed {
  right: auto;
  left: 0;
  transform: translate(-50%, -50%);
}
</style>
