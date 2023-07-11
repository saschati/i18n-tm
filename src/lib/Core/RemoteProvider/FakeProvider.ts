import AbstractProvider from './AbstractProvider.js'

export default class FakeProvider extends AbstractProvider {
  async translate(text: string): Promise<string> {
    return text
  }
}
