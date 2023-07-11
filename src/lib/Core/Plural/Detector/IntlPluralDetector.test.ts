import IntlPluralDetector from './IntlPluralDetector'

describe('IntlPluralDetector', () => {
  describe('detect', () => {
    it('should return correct plural variants for English locale', () => {
      const numbers = [1, 2, 5, 10]
      const detector = new IntlPluralDetector(numbers)

      const variants = detector.detect('en-US')

      expect(variants).toEqual(['one', 'other'])
    })

    it('hould return the correct plurals for the Ukrainian locale', () => {
      const numbers = [1, 2, 5, 10]
      const detector = new IntlPluralDetector(numbers)

      const variants = detector.detect('uk-UA')

      expect(variants).toEqual(['one', 'few', 'many'])
    })

    it('should use cached variants for the same locale', () => {
      const numbers = [1, 2, 5, 10]
      const detector = new IntlPluralDetector(numbers)

      const variants1 = detector.detect('en-US')
      const variants2 = detector.detect('en-US')

      expect(variants1).toEqual(['one', 'other'])
      expect(variants2).toBe(variants1)
    })

    it('should return empty array for unknown locale', () => {
      const numbers = [1, 2, 5, 10]
      const detector = new IntlPluralDetector(numbers)

      const variants = detector.detect('xx-XX')

      expect(variants).toEqual(['one', 'other'])
    })
  })
})
