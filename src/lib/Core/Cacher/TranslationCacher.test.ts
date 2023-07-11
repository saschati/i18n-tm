import TranslationCacher from './TranslationCacher'

describe('TranslationCacher', () => {
  const mockStorage = {
    save: jest.fn(),
  }
  const mockReader = {
    read: jest.fn(),
  }
  const pathname = '/path/to/file'
  const cacher = new TranslationCacher(mockStorage, mockReader, pathname)

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('set', () => {
    it('should save the cache to storage', async () => {
      const cache = {
        locale: {
          pathname: {
            foo: 'bar',
          },
        },
      }

      await cacher.set(cache)

      expect(mockStorage.save).toHaveBeenCalledWith(pathname, cache)
    })
  })

  describe('get', () => {
    it('should read the cache from storage', async () => {
      const cache = {
        locale: {
          pathname: {
            foo: 'bar',
          },
        },
      }

      mockReader.read.mockResolvedValue(cache)

      const result = await cacher.get()

      expect(mockReader.read).toHaveBeenCalledWith(pathname)
      expect(result).toEqual(cache)
    })
  })
})
