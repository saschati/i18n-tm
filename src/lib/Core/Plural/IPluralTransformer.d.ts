import { TranslationDiffObject, TranslationDiffObjectDelete } from '../../../types'

export default interface IPluralTransformer {
  transform(
    fromLocale: string,
    toLocale: string,
    diff: TranslationDiffObject | TranslationDiffObjectDelete
  ): TranslationDiffObject | TranslationDiffObjectDelete
}
