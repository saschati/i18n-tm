export default class AbstractProvider {
  _preparators
  constructor(_preparators) {
    this._preparators = _preparators
  }
  async translateDeep(diff, fLocale, tLocale) {
    if (typeof diff !== 'object' && typeof diff === 'string') {
      let text = this._preparators.reduce((text, ptor) => ptor.prepareBefore(text), diff)
      text = await this.translate(text, fLocale, tLocale)
      text = this._preparators.reduce((text, ptor) => ptor.prepareAfter(text), text)
      return text
    }
    for (const [key, value] of Object.entries(diff)) {
      diff[key] = await this.translateDeep(value, fLocale, tLocale)
    }
    return diff
  }
}
