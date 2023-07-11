import fs from 'fs/promises'
import DirChecker from './DirChecker'

describe('DirChecker', () => {
  const dirChecker = new DirChecker()

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('has', () => {
    it('should return true if directory exists', async () => {
      const path = '/path/to/directory'
      const accessSpy = jest.spyOn(fs, 'access').mockResolvedValueOnce()

      const result = await dirChecker.has(path)

      expect(accessSpy).toHaveBeenCalledWith(path)
      expect(result).toBe(true)
    })

    it('should return false if directory does not exist', async () => {
      const path = '/path/to/nonexistent/directory'
      const accessSpy = jest.spyOn(fs, 'access').mockRejectedValueOnce(new Error())

      const result = await dirChecker.has(path)

      expect(accessSpy).toHaveBeenCalledWith(path)
      expect(result).toBe(false)
    })
  })
})
