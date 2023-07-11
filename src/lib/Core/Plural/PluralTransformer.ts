import type { TranslationDiffObject } from '../../../types'
import type IPluralTransformer from './IPluralTransformer'
import type IKeyer from './Keyer/IKeyer'
import type IPluralDetector from './Detector/IPluralDetector'

export default class PluralTransformer implements IPluralTransformer {
  private _detectedCache: Record<string, string[]> = {}

  constructor(private _detector: IPluralDetector, private _keyer: IKeyer) {}

  transform(
    fromLocale: string,
    toLocale: string,
    diff: TranslationDiffObject
  ): TranslationDiffObject {
    const fromRules = [
      ...(this._detectedCache[fromLocale] ??= [...this._detector.detect(fromLocale)].sort()),
    ]
    const toRules = [
      ...(this._detectedCache[toLocale] ??= [...this._detector.detect(toLocale)].sort()),
    ]

    if (
      toRules.length === fromRules.length &&
      fromRules.every((value, index) => value === toRules[index])
    ) {
      return { ...diff }
    }

    const clearFromRules: string[] = []
    fromRules.forEach((rule) => {
      const ruleIndex = toRules.indexOf(rule)

      if (!~ruleIndex) {
        clearFromRules.push(rule)
      } else {
        toRules.splice(ruleIndex, 1)
      }
    })

    diff = this.transformRecursive(fromRules, clearFromRules, toRules, diff)

    return diff
  }

  private transformRecursive(
    allRules: string[],
    fromRules: string[],
    toRules: string[],
    diff: TranslationDiffObject
  ) {
    const miss: string[] = []

    diff = { ...diff }

    for (const [key, value] of Object.entries(diff)) {
      if (miss.includes(key)) {
        continue
      }

      if (typeof value === 'object' && value !== null) {
        diff[key] = this.transformRecursive(allRules, fromRules, toRules, value)

        continue
      }

      if (this._keyer.has(key) === false) {
        continue
      }

      const [begining, ending] = this._keyer.get(key)

      if (!allRules.includes(ending)) {
        continue
      }

      allRules.forEach((rule) => miss.push(this._keyer.format(begining, rule)))
      fromRules.forEach((rule) => delete diff[this._keyer.format(begining, rule)])
      toRules.forEach((rule) => (diff[this._keyer.format(begining, rule)] = value))
    }

    return diff
  }
}
