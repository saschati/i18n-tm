export default class PluralCleaner {
  _detector
  _keyer
  _detectedCache = {}
  constructor(_detector, _keyer) {
    this._detector = _detector
    this._keyer = _keyer
  }
  clean(locale, diff) {
    const rules = [...(this._detectedCache[locale] ??= [...this._detector.detect(locale)].sort())]
    return this.cleanRecursive(rules, diff)
  }
  cleanRecursive(rules, diff) {
    const miss = []
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
