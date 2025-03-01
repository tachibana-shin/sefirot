import { createRule } from '../Rule'
import { decimal as baseDecimal, hyphen } from '../validators'

export const message = {
  en: 'The value must be valid decimal numbers.',
  ja: 'この値は小数または10進数である必要があります。',
  vi: 'Giá trị phải là số thập phân hợp lệ.'
}

export function decimal(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: (value: string) => !hyphen(value) && baseDecimal(value)
  })
}
