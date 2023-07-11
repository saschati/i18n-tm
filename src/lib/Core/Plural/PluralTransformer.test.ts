import PluralTransformer from './PluralTransformer'
import MockPluralDetector from './Detector/IntlPluralDetector'
import MockKeyer from './Keyer/UnderlineKeyer'
import { TranslationDiffObject } from '../../../types'

describe('PluralTransformer', () => {
  let transformer: PluralTransformer
  const rules = Array(101)
    .fill(null)
    .map((_, i) => i)

  beforeEach(() => {
    const mockDetector = new MockPluralDetector(rules)
    const mockKeyer = new MockKeyer('.')
    transformer = new PluralTransformer(mockDetector, mockKeyer)
  })

  describe('transform', () => {
    it('should return the diff object if fromLocale and toLocale use the same plural rules', () => {
      const fromLocale = 'en-US'
      const toLocale = 'en-GB'
      const diff: TranslationDiffObject = {
        'key.one': 'one value',
        'key.other': 'other value',
      }

      const result = transformer.transform(fromLocale, toLocale, diff)

      expect(result).toEqual(diff)
    })

    it('should transform the diff object to the target plural rules', () => {
      const fromLocale = 'en-US'
      const toLocale = 'uk-UA'
      const diff: TranslationDiffObject = {
        'key.one': 'one value',
        'key.other': 'other value',
      }
      const expected: TranslationDiffObject = {
        'key.one': 'one value',
        'key.few': 'one value',
        'key.many': 'one value',
      }

      const result = transformer.transform(fromLocale, toLocale, diff)

      expect(result).toEqual(expected)
    })

    it('should transform the diff object recursively to the target plural rules', () => {
      const fromLocale = 'en-US'
      const toLocale = 'uk-UA'

      const diff: TranslationDiffObject = {
        'beginning.one': {
          'nested.one': 'nested one value',
          'nested.other': 'nested other value',
        },
        'beginning.other': 'rule2 value',
      }
      const expected: TranslationDiffObject = {
        'beginning.one': {
          'nested.few': 'nested one value',
          'nested.many': 'nested one value',
          'nested.one': 'nested one value',
        },
        'beginning.few': 'rule2 value',
        'beginning.many': 'rule2 value',
      }

      const result = transformer.transform(fromLocale, toLocale, diff)

      expect(result).toEqual(expected)
    })
  })
})
