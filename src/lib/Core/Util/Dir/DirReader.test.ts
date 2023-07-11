import fs from 'fs/promises'
import DirReader from './DirReader'

describe('DirReader', () => {
  const dirReader = new DirReader()

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('readdir', () => {
    it('should return an empty array when given an invalid path', async () => {
      // Set up mock behavior for fs.access and fs.readdir
      const accessSpy = jest.spyOn(fs, 'access').mockRejectedValueOnce(new Error())
      const readdirSpy = jest.spyOn(fs, 'readdir').mockResolvedValueOnce([])

      const files = await dirReader.readdir('non/existent/path')

      expect(files).toEqual([])
      expect(accessSpy).toHaveBeenCalledWith('non/existent/path')
      expect(readdirSpy).not.toHaveBeenCalled()
    })

    it('should return a list of files when given a valid path', async () => {
      // Set up mock behavior for fs.access and fs.readdir
      const accessSpy = jest.spyOn(fs, 'access').mockResolvedValueOnce(undefined)
      const mockfiles = ['file1.txt', 'file2.txt']
      const readdirSpy = jest.spyOn(fs, 'readdir').mockResolvedValueOnce(mockfiles as any)

      const files = await dirReader.readdir('./')

      expect(files).toEqual(mockfiles)
      expect(accessSpy).toHaveBeenCalledWith('./')
      expect(readdirSpy).toHaveBeenCalledWith('./')
    })
  })
})
