import fs from 'fs/promises'
export default class DirReader {
  async readdir(path) {
    try {
      await fs.access(path)
      const files = await fs.readdir(path)
      return files || []
    } catch (e) {
      return []
    }
  }
}
