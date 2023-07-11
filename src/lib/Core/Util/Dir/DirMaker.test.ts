import fs from 'fs/promises'
import DirMaker from './DirMaker'

describe('DirMaker', () => {
  const dirMaker = new DirMaker()

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('create', () => {
    it('should create directory if it does not exist', async () => {
      const path = '/path/to/directory'
      const accessSpy = jest.spyOn(fs, 'access').mockRejectedValueOnce(new Error())
      const mkdirSpy = jest.spyOn(fs, 'mkdir').mockResolvedValueOnce(undefined)

      await dirMaker.create(path)

      expect(accessSpy).toHaveBeenCalledWith(path)
      expect(mkdirSpy).toHaveBeenCalledWith(path, { recursive: true })
    })

    it('should not create directory if it already exists', async () => {
      const path = '/path/to/existing/directory'
      const accessSpy = jest.spyOn(fs, 'access').mockResolvedValueOnce()
      const mkdirSpy = jest.spyOn(fs, 'mkdir').mockResolvedValueOnce(undefined)

      await dirMaker.create(path)

      expect(accessSpy).toHaveBeenCalledWith(path)
      expect(mkdirSpy).not.toHaveBeenCalled()
    })
  })
})
