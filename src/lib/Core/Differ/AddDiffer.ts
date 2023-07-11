import { addedDiff } from 'deep-object-diff'
import type { TranslationDiffObject } from '../../../types'
import type IDiffer from './IDiffer'

export default class AddDiffer implements IDiffer<TranslationDiffObject, TranslationDiffObject> {
  diff(fromObject: TranslationDiffObject, toObject: TranslationDiffObject): TranslationDiffObject {
    if (Object.keys(fromObject).length === 0) {
      return {}
    }

    if (Object.keys(toObject).length === 0) {
      return fromObject
    }

    const diff = addedDiff(toObject, fromObject)

    return diff as TranslationDiffObject
  }
}
