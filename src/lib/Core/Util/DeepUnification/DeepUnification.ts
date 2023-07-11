import mergician from 'mergician'
import type { TranslationDiffObject } from '../../../../types'
import type IDeepUnification from './IDeepUnification'

export default class DeepUnification implements IDeepUnification<TranslationDiffObject> {
  unification(from: TranslationDiffObject, to: TranslationDiffObject): TranslationDiffObject {
    return mergician(from, to)
  }
}
