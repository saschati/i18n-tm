import type { TranslationDiffObject } from '../../../types'
import type IPreparator from './Preparator/IPreparator'

export default abstract class AbstractProvider {
  constructor(private _preparators: IPreparator[]) {}

  abstract translate(text: string, from: string, to: string): Promise<string>

  async translateDeep(
    diff: TranslationDiffObject | string,
    fLocale: string,
    tLocale: string
  ): Promise<TranslationDiffObject | string> {
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
