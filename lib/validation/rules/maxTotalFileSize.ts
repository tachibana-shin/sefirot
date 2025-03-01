import { createRule } from '../Rule'
import { maxTotalFileSize as baseMaxTotalFileSize } from '../validators/maxTotalFileSize'

export const message = {
  en: (size: string) => `The total file size must be smaller than or equal to ${size}.`,
  ja: (size: string) => `合計ファイルサイズは最大${size}までです。`,
  vi: (size: string) => `Tổng kích thước tệp phải nhỏ hơn hoặc bằng ${size}.`
}

export function maxTotalFileSize(size: string, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang](size),
    optional: true,
    validation: (value: File[]) => baseMaxTotalFileSize(value, size)
  })
}
