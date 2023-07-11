import UnderlineKeyer from '@App/Core/Plural/Keyer/UnderlineKeyer.js'
import PluralCleaner from '@App/Core/Plural/PluralCleaner.js'
import PluralTransformer from '@App/Core/Plural/PluralTransformer.js'
import IntlPluralDetector from '@App/Core/Plural/Detector/IntlPluralDetector.js'
import type IPluralDetector from '@App/Core/Plural/Detector/IPluralDetector.js'
import type IPluralCleaner from '@App/Core/Plural/IPluralCleaner.js'
import type IPluralTransformer from '@App/Core/Plural/IPluralTransformer.js'
import type IKeyer from '@App/Core/Plural/Keyer/IKeyer.js'
import type { Bootstrap } from '../bootstrap.js'

const bootstrap: Bootstrap = (contaner) => {
  contaner.set<IPluralDetector>(
    'IPluralDetector',
    () =>
      new IntlPluralDetector(
        Array(101)
          .fill(null)
          .map((_, i) => i)
      )
  )
  contaner.set<IKeyer>('IKeyer', () => new UnderlineKeyer())
  contaner.set<IPluralCleaner>(
    'IPluralCleaner',
    () =>
      new PluralCleaner(
        contaner.get<IPluralDetector>('IPluralDetector'),
        contaner.get<IKeyer>('IKeyer')
      )
  )
  contaner.set<IPluralTransformer>(
    'IPluralTransformer',
    () =>
      new PluralTransformer(
        contaner.get<IPluralDetector>('IPluralDetector'),
        contaner.get<IKeyer>('IKeyer')
      )
  )
}

export default bootstrap
