import AbstractProvider from './AbstractProvider.js'
export default class FakeProvider extends AbstractProvider {
  async translate(text) {
    return text
  }
}
