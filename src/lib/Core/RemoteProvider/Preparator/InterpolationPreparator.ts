import type IPreparator from './IPreparator'

const REP_PREFIX = 'i'
const REP_PATTERN = new RegExp(`{{${REP_PREFIX}-(\d+)}}`, 'g')

export default class InterpolationPreparator implements IPreparator {
  private _itrParams: number[] = []

  constructor(private _itpPattern: RegExp) {}

  prepareBefore(text: string): string {
    text = text.replace(
      this._itpPattern,
      (rpl) => `{{${REP_PREFIX}-${this._itrParams.push(+rpl) - 1}}}`
    )

    return text
  }

  prepareAfter(text: string): string {
    text = text.replace(REP_PATTERN, (_: unknown, index: string) => {
      return String(this._itrParams.splice(this._itrParams[+index] as number, 1))
    })

    return text
  }
}
