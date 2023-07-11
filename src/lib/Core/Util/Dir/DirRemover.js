import fs from 'fs/promises'
export default class DirRemover {
  async remove(path) {
    try {
      await fs.access(path)
      return await fs.rmdir(path)
    } catch (e) {}
  }
}
