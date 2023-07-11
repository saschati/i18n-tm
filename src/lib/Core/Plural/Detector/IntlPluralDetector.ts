import type IPluralDetector from './IPluralDetector'

export default class IntlPluralDetector implements IPluralDetector {
  private _cache: Record<string, string[]> = {}

  constructor(private _numbers: number[]) {}

  detect(locale: string): string[] {
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
