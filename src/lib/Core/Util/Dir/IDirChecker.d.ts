export default interface IDirChecker {
  has(path: string): Promise<boolean>
}
