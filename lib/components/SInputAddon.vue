<script setup lang="ts">
import IconCaretDown from '@iconify-icons/ph/caret-down-bold'
import {
  type DropdownSection,
  getSelectedOption,
  useManualDropdownPosition
} from 'sefirot/composables/Dropdown'
import { useFlyout } from 'sefirot/composables/Flyout'
import { computed, ref } from 'vue'
import { isString } from '../support/Utils'
import SDropdown from './SDropdown.vue'
import SIcon from './SIcon.vue'

const props = withDefaults(defineProps<{
  label?: any
  clickable?: boolean
  dropdown?: DropdownSection[]
  dropdownCaret?: boolean
  dropdowpPosition?: 'top' | 'bottom'
  disabled?: boolean
}>(), {
  clickable: true,
  dropdown: () => [],
  dropdownCaret: true
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const container = ref<any>(null)

const isFocused = ref(false)

const classes = computed(() => [
  { clickable: props.clickable },
  { focused: isFocused.value },
  { disabled: props.disabled }
])

const selectedOptionLabel = computed(() => {
  return getSelectedOption(props.dropdown)?.label ?? null
})

const { isOpen, open } = useFlyout(container)
const { position, update: updatePosition } = useManualDropdownPosition(container)

function handleFocus() {
  if (!props.disabled) {
    isFocused.value = true
  }
}

function handleBlur() {
  if (!props.disabled) {
    isFocused.value = false
  }
}

function handleClickButton() {
  if (!props.disabled) {
    emit('click')

    if (props.dropdown.length) {
      updatePosition()
      open()
    }
  }
}
</script>

<template>
  <div class="SInputAddon" :class="classes" ref="container" @click.stop>
    <component
      :is="clickable ? 'button' : 'div'"
      class="action"
      :disabled="clickable ? props.disabled : null"
      @focus="handleFocus"
      @blur="handleBlur"
      @click="handleClickButton"
    >
      <span class="action-label">
        <SIcon
          v-if="props.label && !isString(props.label)"
          class="action-icon"
          :icon="props.label"
        />
        <span v-else>
          {{ props.label ?? selectedOptionLabel }}
        </span>
      </span>

      <SIcon
        v-if="props.dropdown.length && props.dropdownCaret"
        class="caret"
        :icon="IconCaretDown"
      />
    </component>

    <div v-if="isOpen" class="dialog" :class="position">
      <SDropdown :sections="dropdown" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SInputAddon {
  position: relative;
}

.action {
  display: flex;
  align-items: center;
  height: 100%;
  background-color: var(--button-fill-mute-bg-color);
  transition: background-color 0.25s;

  .SInputAddon.clickable &:hover,
  .SInputAddon.clickable.focused & {
    background-color: var(--button-fill-mute-hover-bg-color);
  }

  .SInputAddon.clickable &:active {
    background-color: var(--button-fill-mute-active-bg-color);
  }

  .SInputAddon.disabled &,
  .SInputAddon.disabled.clickable &:hover,
  .SInputAddon.disabled.clickable &:active,
  .SInputAddon.disabled.clickable.focused & {
    background-color: var(--button-fill-mute-bg-color);
    cursor: not-allowed;
  }
}

.dialog {
  position: absolute;
  z-index: var(--z-index-dropdown);

  &.top    { bottom: calc(100% + 8px); }
  &.bottom { top: calc(100% + 8px); }
}
</style>
