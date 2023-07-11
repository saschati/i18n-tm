import fs from 'fs/promises'
export default class DirChecker {
  async has(path) {
    try {
      await fs.access(path)
      return true
    } catch (e) {
      return false
    }
  }
}
