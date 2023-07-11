export default class PluralTransformer {
  _detector
  _keyer
  _detectedCache = {}
  constructor(_detector, _keyer) {
    this._detector = _detector
    this._keyer = _keyer
  }
  transform(fromLocale, toLocale, diff) {
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
    const clearFromRules = []
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
  transformRecursive(allRules, fromRules, toRules, diff) {
    const miss = []
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
