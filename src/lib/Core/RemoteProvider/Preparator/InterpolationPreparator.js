const REP_PREFIX = 'i'
const REP_PATTERN = new RegExp(`{{${REP_PREFIX}-(\d+)}}`, 'g')
export default class InterpolationPreparator {
  _itpPattern
  _itrParams = []
  constructor(_itpPattern) {
    this._itpPattern = _itpPattern
  }
  prepareBefore(text) {
    text = text.replace(
      this._itpPattern,
      (rpl) => `{{${REP_PREFIX}-${this._itrParams.push(+rpl) - 1}}}`
    )
    return text
  }
  prepareAfter(text) {
    text = text.replace(REP_PATTERN, (_, index) => {
      return String(this._itrParams.splice(this._itrParams[+index], 1))
    })
    return text
  }
}
