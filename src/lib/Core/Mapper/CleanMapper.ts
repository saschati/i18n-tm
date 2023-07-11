import AbstractMapper from './AbstractMapper.js'
import type { TranslationDiffObject } from '../../../types'

export default class CleanMapper extends AbstractMapper {
  protected action(from: TranslationDiffObject, to: TranslationDiffObject): TranslationDiffObject {
    from = { ...from }
    to = Array.isArray(to) ? [...to] : { ...to }

    const isArray = Array.isArray(to)
    for (const [key, value] of Object.entries(from)) {
      const toKey = isArray ? +key : key

      if (Object.is(toKey, NaN) === true) {
        continue
      }

      if (typeof value === 'object' && value !== null) {
        to[toKey] = this.action(value, to[toKey] as TranslationDiffObject)

        continue
      }

      if (isArray) {
        to.pop()

        continue
      }

      delete to[key]
    }

    return to
  }
}
