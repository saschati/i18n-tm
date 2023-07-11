export default interface IKeyer<T = [string, string]> {
  has(key: string): boolean
  get(key: string): T
  format(name: string, rule: string): string
}
