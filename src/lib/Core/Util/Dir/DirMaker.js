import fs from 'fs/promises'
export default class DirMaker {
  async create(path) {
    try {
      await fs.access(path)
    } catch (e) {
      await fs.mkdir(path, { recursive: true })
    }
  }
}
