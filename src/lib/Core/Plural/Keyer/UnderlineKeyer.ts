import type IKeyer from './IKeyer'

export default class UnderlineKeyer implements IKeyer {
  constructor(private _separator: string = '_') {}

  has(key: string): boolean {
    return key.includes(this._separator) === true
  }

  get(key: string): [string, string] {
    const [ending, ...names] = key.split(this._separator).reverse()

    return [names.reverse().join(this._separator), ending as string]
  }

  format(name: string, rule: string): string {
    return [name, this._separator, rule].join('')
  }
}
