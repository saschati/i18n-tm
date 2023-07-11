import fs from 'fs/promises'
import type IFileChecker from './IFileChecker'

export default class FileChecker implements IFileChecker {
  async check(pathname: string): Promise<boolean> {
    try {
      await fs.access(pathname, fs.constants.F_OK)

      return true
    } catch (error) {
      return false
    }
  }
}
