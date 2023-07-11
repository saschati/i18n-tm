export default class UnderlineKeyer {
  _separator
  constructor(_separator = '_') {
    this._separator = _separator
  }
  has(key) {
    return key.includes(this._separator) === true
  }
  get(key) {
    const [ending, ...names] = key.split(this._separator).reverse()
    return [names.reverse().join(this._separator), ending]
  }
  format(name, rule) {
    return [name, this._separator, rule].join('')
  }
}
