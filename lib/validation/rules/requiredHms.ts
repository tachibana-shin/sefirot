import { type Hms } from '../../support/Day'
import { createRule } from '../Rule'
import { requiredHms as baseRequiredHms } from '../validators/requiredHms'

type HmsType = 'h' | 'm' | 's'

export const message = {
  en: 'The field is required.',
  ja: 'この項目は必須です。',
  vi: 'Trường này là bắt buộc.'
}

export function requiredHms(required?: HmsType[], msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: (value: Hms) => baseRequiredHms(value, required)
  })
}
