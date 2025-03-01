import { createRule } from '../Rule'
import { maxLength as baseMaxLength } from '../validators'

export const message = {
  en: (length: number) => `The value must be less than or equal to ${length} characters.`,
  ja: (length: number) => `この値は、最大${length}文字までです。`,
  vi: (length: number) => `Giá trị phải ít hơn hoặc bằng ${length} ký tự.`
}

export function maxLength(length: number, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang](length),
    optional: true,
    validation: (value: string) => baseMaxLength(value, length)
  })
}
