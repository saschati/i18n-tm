import type { TranslationDiffObject } from '../../../types'
import type IPluralDetector from './Detector/IPluralDetector'
import type IPluralCleaner from './IPluralCleaner'
import type IKeyer from './Keyer/IKeyer'

export default class PluralCleaner implements IPluralCleaner {
  private _detectedCache: Record<string, string[]> = {}

  constructor(private _detector: IPluralDetector, private _keyer: IKeyer) {}

  clean(locale: string, diff: TranslationDiffObject): TranslationDiffObject {
    const rules = [...(this._detectedCache[locale] ??= [...this._detector.detect(locale)].sort())]

    return this.cleanRecursive(rules, diff)
  }

  private cleanRecursive(rules: string[], diff: TranslationDiffObject) {
    const miss: string[] = []

    diff = { ...diff }

    for (const [key, value] of Object.entries(diff)) {
      if (miss.includes(key)) {
        continue
      }

      if (typeof value === 'object' && value !== null) {
        diff[key] = this.cleanRecursive(rules, { ...value })

        continue
      }

      if (this._keyer.has(key) === false) {
        continue
      }

      const [begining, ending] = this._keyer.get(key)

      if (!rules.includes(ending)) {
        continue
      }

      rules.forEach((rule) => delete diff[this._keyer.format(begining, rule)])
    }

    return diff
  }
}
