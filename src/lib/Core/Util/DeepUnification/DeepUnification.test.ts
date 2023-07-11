import DeepUnification from './DeepUnification'

describe('DeepUnfication', () => {
  const deepUnification = new DeepUnification()

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('unification', () => {
    it('should return merged object with correct properties', () => {
      const from = {
        foo: 'bar',
        baz: { qux: 'quux' },
      }
      const to = {
        foo: 'qux',
        baz: { qux: 'foo' },
      }
      const expected = {
        foo: 'qux',
        baz: { qux: 'foo' },
      }

      const result = deepUnification.unification(from, to)

      expect(result).toEqual(expected)
    })
  })
})
