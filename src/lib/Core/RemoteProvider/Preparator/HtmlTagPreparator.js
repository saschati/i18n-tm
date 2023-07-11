const REP_PREFIX = 't'
const REP_PATTERN = new RegExp(`<<(${REP_PREFIX}-\d+)>>`, 'g')
export default class HtmlTagPreparator {
  _tagPattern
  _tapParams = []
  constructor(_tagPattern) {
    this._tagPattern = _tagPattern
  }
  prepareBefore(text) {
    text = text.replace(
      this._tagPattern,
      (rpl) => `<<${REP_PREFIX}-${this._tapParams.push(+rpl) - 1}>>`
    )
    return text
  }
  prepareAfter(text) {
    text.replace(REP_PATTERN, (_, index) => {
      return String(this._tapParams.splice(this._tapParams[+index], 1))
    })
    return text
  }
}
