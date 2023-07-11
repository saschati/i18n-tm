import { deletedDiff } from 'deep-object-diff'
import type { TranslationDiffObject, TranslationDiffObjectDelete } from '../../../types'
import type IDiffer from './IDiffer'

export default class DeleteDiffer
  implements IDiffer<TranslationDiffObject, TranslationDiffObjectDelete>
{
  diff(
    fromObject: TranslationDiffObject,
    toObject: TranslationDiffObject
  ): TranslationDiffObjectDelete {
    if (Object.keys(fromObject).length === 0 || Object.keys(toObject).length === 0) {
      return {}
    }

    const diff = deletedDiff(toObject, fromObject)

    return JSON.parse(JSON.stringify(diff, (_, v) => (v === undefined ? null : v)))
  }
}
