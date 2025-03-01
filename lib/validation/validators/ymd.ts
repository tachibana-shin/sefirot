import day from 'dayjs'
import { type Ymd } from '../../support/Day'

type YmdType = 'y' | 'm' | 'd'

const YmdMap = {
  y: 'year',
  m: 'month',
  d: 'date'
} as const

export function ymd(ymd: Ymd, required: YmdType[] = ['y', 'm', 'd']): boolean {
  return required.every((r) => {
    const value = ymd[YmdMap[r]]

    if (value === null) {
      return true
    }

    if (r === 'y') {
      return value > 0 && value <= 9999
    }

    if (r === 'm') {
      return value > 0 && value <= 12
    }

    const d = day(new Date(2020, ymd.month ? ymd.month - 1 : 1, value))

    if (d.month() + 1 !== (ymd.month ?? 1)) {
      return false
    }

    return d.isValid()
  })
}
