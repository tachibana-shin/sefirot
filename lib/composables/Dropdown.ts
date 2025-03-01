import { useElementBounding, useWindowSize } from '@vueuse/core'
import { type Component, type MaybeRef, type MaybeRefOrGetter, type Ref, ref, unref } from 'vue'
import { type ActionList } from '../components/SActionList.vue'
import { type DateRange } from '../support/DateRange'

export type DropdownSection =
  | DropdownSectionMenu
  | DropdownSectionFilter
  | DropdownSectionDateRange
  | DropdownSectionComponent
  | DropdownSectionActions

export type DropdownSectionType =
  | 'menu'
  | 'filter'
  | 'date-range'
  | 'actions'
  | 'component'

export interface DropdownSectionBase {
  type: DropdownSectionType
}

export interface DropdownSectionMenu extends DropdownSectionBase {
  type: 'menu'
  options: ActionList
}

export interface DropdownSectionFilter extends DropdownSectionBase {
  type: 'filter'
  search?: boolean
  selected: MaybeRef<DropdownSectionFilterSelectedValue>
  options: MaybeRef<DropdownSectionFilterOption[]>
  onClick?(value: string | number | boolean): void
}

export type DropdownSectionFilterSelectedValue =
  | string
  | number
  | boolean
  | null
  | (string | number | boolean)[]

export type DropdownSectionFilterOption =
  | DropdownSectionFilterOptionText
  | DropdownSectionFilterOptionAvatar

export interface DropdownSectionFilterOptionBase {
  type?: 'text' | 'avatar'
  label: string
  value: string | number | boolean
  disabled?: boolean
  onClick?(value: string | number | boolean): void
}

export interface DropdownSectionFilterOptionText extends DropdownSectionFilterOptionBase {
  type?: 'text'
}

export interface DropdownSectionFilterOptionAvatar extends DropdownSectionFilterOptionBase {
  type: 'avatar'
  image?: string | null
}

export interface DropdownSectionDateRange extends DropdownSectionBase {
  type: 'date-range'
  range: MaybeRefOrGetter<DateRange>
  onApply(range: DateRange): void
}

export interface DropdownSectionActions extends DropdownSectionBase {
  type: 'actions'
  options: DropdownSectionActionsOption[]
}

export interface DropdownSectionActionsOption {
  mode?: 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'
  label: string
  onClick(): void
}

export interface DropdownSectionComponent extends DropdownSectionBase {
  type: 'component'
  component: Component
  props?: Record<string, any>
}

export interface ManualDropdownPosition {
  container: Ref<any>
  position: Ref<'top' | 'bottom'>
  update(): void
}

export function createDropdown(section: DropdownSection[]): DropdownSection[] {
  return section
}

export function createDropdownDateRange(
  section: Omit<DropdownSectionDateRange, 'type'>
): DropdownSectionDateRange {
  return { type: 'date-range', ...section }
}

export function createDropdownMenu(
  section: Omit<DropdownSectionMenu, 'type'>
): DropdownSectionMenu {
  return { type: 'menu', ...section }
}

export function createDropdownFilter(
  section: Omit<DropdownSectionFilter, 'type'>
): DropdownSectionFilter {
  return { type: 'filter', ...section }
}

export function createDropdownActions(
  section: Omit<DropdownSectionActions, 'type'>
): DropdownSectionActions {
  return { type: 'actions', ...section }
}

export function createDropdownComponent(
  section: Omit<DropdownSectionComponent, 'type'>
): DropdownSectionComponent {
  return { type: 'component', ...section }
}

export function useManualDropdownPosition(
  container?: Ref<any>,
  initPosition?: 'top' | 'bottom'
): ManualDropdownPosition {
  const el = container ?? ref<any>(null)

  const { top, bottom } = useElementBounding(el)
  const { height } = useWindowSize()

  const position = ref<'top' | 'bottom'>(initPosition ?? 'bottom')

  const dialogHeight = 400

  function update(): void {
    if (initPosition) {
      return
    }

    // If the space top of the input is not enough to show dialog, just show
    // the dialog at the bottom of the input.
    if (top.value < dialogHeight) {
      position.value = 'bottom'
      return
    }

    // Else show dialog depending on the space bottom of the input.
    if (bottom.value + dialogHeight <= height.value) {
      position.value = 'bottom'
      return
    }

    position.value = 'top'
  }

  return {
    container: el,
    position,
    update
  }
}

export function getSelectedOption(
  sections: DropdownSection[]
): DropdownSectionFilterOption | null {
  for (const section of sections) {
    if (section.type === 'filter') {
      const options = unref(section.options)
      const selected = unref(section.selected)

      for (const option of options) {
        if (option.value === selected) {
          return option
        }
      }
    }
  }

  return null
}
