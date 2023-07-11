import AbstractMapper from './AbstractMapper.js'
import type { TranslationDiffObject } from '../../../types'

export default class MargeMapper extends AbstractMapper {
  protected action(from: TranslationDiffObject, to: TranslationDiffObject): TranslationDiffObject {
    from = { ...from }
    to = Array.isArray(to) ? [...to] : { ...to }

    const isArray = Array.isArray(to)
    for (const [key, value] of Object.entries(from)) {
      if (!isArray && typeof value === 'object') {
        const [check] = Object.keys(value)

        const isNumber = !isNaN(Number(check))
        if (isNumber === true && (to[key] === undefined || Array.isArray(to[key]) === false)) {
          to[key] = []
        } else if (isNumber === false && Array.isArray(to[key]) === true) {
          to[key] = {}
        }
      }

      const toKey = isArray ? +key : key

      if (typeof value !== 'object') {
        to[toKey] = value

        continue
      }

      if (typeof to[toKey] !== 'object' && typeof value === 'object') {
        to[toKey] = this.action(value, {})

        continue
      }

      to[toKey] = this.action(value, to[toKey] as TranslationDiffObject)
    }

    return to
  }
}
