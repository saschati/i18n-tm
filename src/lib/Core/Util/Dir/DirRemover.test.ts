import DirRemover from './DirRemover'
import fs from 'fs/promises'

describe('DirRemover', () => {
  let dirRemover: DirRemover
  const path = '/path/to/remove'

  beforeEach(() => {
    dirRemover = new DirRemover()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('remove', () => {
    it('should remove directory if it exists', async () => {
      const accessSpy = jest.spyOn(fs, 'access').mockResolvedValueOnce(undefined)
      const rmdirSpy = jest.spyOn(fs, 'rmdir').mockResolvedValueOnce(undefined)

      await dirRemover.remove(path)

      expect(accessSpy).toHaveBeenCalledWith(path)
      expect(rmdirSpy).toHaveBeenCalledWith(path)
    })

    it('should do nothing if directory does not exist', async () => {
      const accessSpy = jest.spyOn(fs, 'access').mockRejectedValue(new Error())

      await dirRemover.remove(path)

      expect(accessSpy).toHaveBeenCalledWith(path)
      expect(fs.rmdir).not.toHaveBeenCalled()
    })
  })
})
