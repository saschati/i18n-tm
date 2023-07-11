import fs from 'fs/promises'
export default class FileChecker {
  async check(pathname) {
    try {
      await fs.access(pathname, fs.constants.F_OK)
      return true
    } catch (error) {
      return false
    }
  }
}
