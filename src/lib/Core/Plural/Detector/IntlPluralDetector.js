export default class IntlPluralDetector {
  _numbers
  _cache = {}
  constructor(_numbers) {
    this._numbers = _numbers
  }
  detect(locale) {
    const variants = this._cache[locale] || []
    if (variants.length > 0) {
      return variants
    }
    const rules = new Intl.PluralRules(locale)
    for (const n of this._numbers) {
      const rule = rules.select(n)
      if (!variants.includes(rule)) {
        variants.push(rule)
      }
    }
    return (this._cache[locale] = variants)
  }
}
