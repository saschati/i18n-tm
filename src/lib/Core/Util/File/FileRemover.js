import fs from 'fs/promises'
export default class FileRemover {
  async remove(pathname) {
    try {
      await fs.access(pathname, fs.constants.F_OK)
      await fs.unlink(pathname)
    } catch (error) {}
  }
}
