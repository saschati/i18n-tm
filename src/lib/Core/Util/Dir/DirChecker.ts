import fs from 'fs/promises'
import type IDirChecker from './IDirChecker'

export default class DirChecker implements IDirChecker {
  async has(path: string): Promise<boolean> {
    try {
      await fs.access(path)

      return true
    } catch (e) {
      return false
    }
  }
}
