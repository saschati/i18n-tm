const REP_PREFIX = 'n'
const REP_PATTERN = new RegExp(`{{${REP_PREFIX}-(\d+)}}`, 'g')
export default class NestingPreparator {
  _itpPattern
  _nestingParams = []
  constructor(_itpPattern) {
    this._itpPattern = _itpPattern
  }
  prepareBefore(text) {
    text = text.replace(
      this._itpPattern,
      (rpl) => `{{${REP_PREFIX}-${this._nestingParams.push(+rpl) - 1}}}`
    )
    return text
  }
  prepareAfter(text) {
    text = text.replace(REP_PATTERN, (_, index) => {
      return String(this._nestingParams.splice(this._nestingParams[+index], 1))
    })
    return text
  }
}
