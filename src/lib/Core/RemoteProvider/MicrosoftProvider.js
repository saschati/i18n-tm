import { MicrosoftTextTranslator } from '@akgargo/ms-translator-api-client'
import AbstractProvider from './AbstractProvider.js'
export default class MicrosoftProvider extends AbstractProvider {
  _translator
  constructor(apiKey, apiRegion, preparators) {
    super(preparators)
    if (!apiKey) {
      throw new Error('The api key cannot be empty.')
    }
    this._translator = new MicrosoftTextTranslator({
      subscriptionKey: apiKey,
      subscriptionRegion: apiRegion,
    })
  }
  async translate(text, from, to) {
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
