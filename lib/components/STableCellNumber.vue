<script setup lang="ts">
import { format } from 'sefirot/support/Num'
import { computed } from 'vue'
import { type TableCellValueColor } from '../composables/Table'
import SIcon from './SIcon.vue'
import SLink from './SLink.vue'

const props = defineProps<{
  value?: any
  record: any
  align?: 'left' | 'center' | 'right'
  icon?: any
  getter?: number | null
  separator?: boolean
  color?: TableCellValueColor
  iconColor?: TableCellValueColor
  link?: string | null
  onClick?(value: any, record: any): void
}>()

const _value = computed(() => props.getter ?? props.value)
const _color = computed(() => props.color ?? 'neutral')
const _iconColor = computed(() => props.iconColor ?? _color.value)

const classes = computed(() => [
  props.align ?? 'left',
  _color,
  { link: props.link || props.onClick }
])
</script>

<template>
  <div class="STableCellNumber" :class="classes">
    <SLink
      v-if="_value != null"
      class="container"
      :href="link"
      :role="onClick ? 'button' : null"
      @click="() => onClick?.(value, record)"
    >
      <div v-if="icon" class="icon" :class="[_iconColor]">
        <SIcon :icon="icon" class="svg" />
      </div>
      <div class="value" :class="[_color ?? 'neutral']">
        {{ separator ? format(_value) : _value }}
      </div>
    </SLink>
  </div>
</template>

<style scoped lang="postcss">
.STableCellNumber {
  min-height: 40px;
}

.container {
  display: flex;
  gap: 4px;
  padding: 8px 16px;

  .STableCellNumber.left &   { justify-content: flex-start; }
  .STableCellNumber.center & { justify-content: center; }
  .STableCellNumber.right &  { justify-content: flex-end; }
}

.value {
  line-height: 24px;
  font-size: var(--table-cell-font-size);
  font-weight: var(--table-cell-font-weight);
  font-feature-settings: "tnum";
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.25s;

  &.neutral { color: var(--c-text-1); }
  &.soft    { color: var(--c-text-2); }
  &.mute    { color: var(--c-text-3); }
  &.info    { color: var(--c-text-info-1); }
  &.success { color: var(--c-text-success-1); }
  &.warning { color: var(--c-text-warning-1); }
  &.danger  { color: var(--c-text-danger-1); }

  .STableCellNumber.link &       { color: var(--c-text-info-1); }
  .STableCellNumber.link:hover & { color: var(--c-text-info-2); }

  .STableCellNumber.link &.neutral       { color: var(--c-text-1); }
  .STableCellNumber.link:hover &.neutral { color: var(--c-text-info-1); }
  .STableCellNumber.link &.soft          { color: var(--c-text-2); }
  .STableCellNumber.link:hover &.soft    { color: var(--c-text-info-1); }
  .STableCellNumber.link &.mute          { color: var(--c-text-3); }
  .STableCellNumber.link:hover &.mute    { color: var(--c-text-3); }
  .STableCellNumber.link &.info          { color: var(--c-text-info-1); }
  .STableCellNumber.link:hover &.info    { color: var(--c-text-info-2); }
  .STableCellNumber.link &.success       { color: var(--c-text-success-1); }
  .STableCellNumber.link:hover &.success { color: var(--c-text-success-2); }
  .STableCellNumber.link &.warning       { color: var(--c-text-warning-1); }
  .STableCellNumber.link:hover &.warning { color: var(--c-text-warning-2); }
  .STableCellNumber.link &.danger        { color: var(--c-text-danger-1); }
  .STableCellNumber.link:hover &.danger  { color: var(--c-text-danger-2); }

  .STableCell.summary & {
    font-weight: var(--table-cell-summary-font-weight);
  }
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-left: -3px;
  width: 24px;
  height: 24px;
  transition: color 0.25s;

  &.neutral { color: var(--c-text-1); }
  &.soft    { color: var(--c-text-2); }
  &.mute    { color: var(--c-text-3); }

  .STableCellNumber.link &       { color: var(--c-text-info-1); }
  .STableCellNumber.link:hover & { color: var(--c-text-info-2); }

  .STableCellNumber.link &.neutral       { color: var(--c-text-1); }
  .STableCellNumber.link:hover &.neutral { color: var(--c-text-info-1); }
  .STableCellNumber.link &.soft          { color: var(--c-text-2); }
  .STableCellNumber.link:hover &.soft    { color: var(--c-text-info-1); }
  .STableCellNumber.link &.mute          { color: var(--c-text-3); }
  .STableCellNumber.link:hover &.mute    { color: var(--c-text-3); }
  .STableCellNumber.link &.info          { color: var(--c-text-info-1); }
  .STableCellNumber.link:hover &.info    { color: var(--c-text-info-2); }
  .STableCellNumber.link &.success       { color: var(--c-text-success-1); }
  .STableCellNumber.link:hover &.success { color: var(--c-text-success-2); }
  .STableCellNumber.link &.warning       { color: var(--c-text-warning-1); }
  .STableCellNumber.link:hover &.warning { color: var(--c-text-warning-2); }
  .STableCellNumber.link &.danger        { color: var(--c-text-danger-1); }
  .STableCellNumber.link:hover &.danger  { color: var(--c-text-danger-2); }
}

.svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}
</style>
