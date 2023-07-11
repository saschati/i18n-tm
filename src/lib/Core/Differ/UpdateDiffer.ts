import { updatedDiff } from 'deep-object-diff'
import type { TranslationDiffObject } from '../../../types'
import type IDiffer from './IDiffer'

export default class UpdateDiffer implements IDiffer<TranslationDiffObject, TranslationDiffObject> {
  diff(fromObject: TranslationDiffObject, toObject: TranslationDiffObject): TranslationDiffObject {
    if (Object.keys(fromObject).length === 0 || Object.keys(toObject).length === 0) {
      return {}
    }

    const diff = updatedDiff(toObject, fromObject)

    return diff as TranslationDiffObject
  }
}
