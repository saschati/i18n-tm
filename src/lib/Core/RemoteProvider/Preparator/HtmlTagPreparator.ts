import type IPreparator from './IPreparator'

const REP_PREFIX = 't'
const REP_PATTERN = new RegExp(`<<(${REP_PREFIX}-\d+)>>`, 'g')

export default class HtmlTagPreparator implements IPreparator {
  private _tapParams: number[] = []

  constructor(private _tagPattern: RegExp) {}

  prepareBefore(text: string): string {
    text = text.replace(
      this._tagPattern,
      (rpl) => `<<${REP_PREFIX}-${this._tapParams.push(+rpl) - 1}>>`
    )

    return text
  }

  prepareAfter(text: string): string {
    text.replace(REP_PATTERN, (_: unknown, index: string) => {
      return String(this._tapParams.splice(this._tapParams[+index] as number, 1))
    })

    return text
  }
}
