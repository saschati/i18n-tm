export default interface IFileChecker {
  check(pathname: string): Promise<boolean>
}
