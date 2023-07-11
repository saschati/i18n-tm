import { MicrosoftTextTranslator } from '@akgargo/ms-translator-api-client'
import AbstractProvider from './AbstractProvider.js'
import type IPreparator from './Preparator/IPreparator'

export default class MicrosoftProvider extends AbstractProvider {
  private _translator: MicrosoftTextTranslator

  constructor(apiKey: string, apiRegion: string, preparators: IPreparator[]) {
    super(preparators)

    if (!apiKey) {
      throw new Error('The api key cannot be empty.')
    }

    this._translator = new MicrosoftTextTranslator({
      subscriptionKey: apiKey,
      subscriptionRegion: apiRegion,
    })
  }

  async translate(text: string, from: string, to: string): Promise<string> {
    const response = await this._translator.translate({ text, from, to })

    const [translation] = response

    if (!translation) {
      return text
    }

    const { translations } = translation
    const [translate] = translations

    return translate?.text || text
  }
}
