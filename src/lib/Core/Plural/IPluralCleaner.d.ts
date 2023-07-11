import { TranslationDiffObject } from '../../../types'

export default interface IPluralCleaner {
  clean(locale: string, diff: TranslationDiffObject): TranslationDiffObject
}
