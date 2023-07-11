import PluralCleaner from './PluralCleaner'
import MockPluralDetector from './Detector/IntlPluralDetector'
import MockKeyer from './Keyer/UnderlineKeyer'

describe('PluralCleaner', () => {
  let pluralCleaner: PluralCleaner
  const rules = Array(101)
    .fill(null)
    .map((_, i) => i)

  beforeEach(() => {
    const mockDetector = new MockPluralDetector(rules)
    const mockKeyer = new MockKeyer('_')
    pluralCleaner = new PluralCleaner(mockDetector, mockKeyer)
  })

  describe('clean', () => {
    it('should return an empty object if the input is empty', () => {
      const result = pluralCleaner.clean('en-US', {})

      expect(result).toEqual({})
    })

    it('should return the same object if no plural keys are found', () => {
      const diff = {
        key1: 'value1',
        key2: 'value2',
      }

      const result = pluralCleaner.clean('en-US', diff)

      expect(result).toEqual(diff)
    })

    it('should remove keys with plural endings not found in the rules', () => {
      const diff = {
        key1: 'value1',
        key2: 'value2',
        key3_one: 'value3',
        key3_other: 'value3',
      }

      const result = pluralCleaner.clean('en-US', diff)

      expect(result).toEqual({
        key1: 'value1',
        key2: 'value2',
      })
    })

    it('should remove all keys with plural endings found in the rules', () => {
      const diff = {
        key1: 'value1',
        key2: 'value2',
        key3_one: 'value3',
        key3_other: 'value3',
        key4_one: 'value4',
        key4_other: 'value4',
      }

      const result = pluralCleaner.clean('en-US', diff)

      expect(result).toEqual({
        key1: 'value1',
        key2: 'value2',
      })
    })

    it('should remove nested keys with plural endings found in the rules', () => {
      const diff = {
        key1: {
          key1_one: 'value1',
          key1_other: 'value1',
        },
        key2: 'value2',
        key3_one: 'value3',
        key3_other: 'value3',
      }

      const result = pluralCleaner.clean('en-US', diff)

      expect(result).toEqual({
        key1: {},
        key2: 'value2',
      })
    })

    it('should handle plural endings with special characters', () => {
      const diff = {
        key1: 'value1',
        key2: 'value2',
        key3_special_one: 'value3',
        key3_special_other: 'value3',
      }

      const result = pluralCleaner.clean('en-US', diff)

      expect(result).toEqual({
        key1: 'value1',
        key2: 'value2',
      })
    })
  })
})
