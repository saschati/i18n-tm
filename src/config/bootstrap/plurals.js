import UnderlineKeyer from '@App/Core/Plural/Keyer/UnderlineKeyer.js'
import PluralCleaner from '@App/Core/Plural/PluralCleaner.js'
import PluralTransformer from '@App/Core/Plural/PluralTransformer.js'
import IntlPluralDetector from '@App/Core/Plural/Detector/IntlPluralDetector.js'
const bootstrap = (contaner) => {
  contaner.set(
    'IPluralDetector',
    () =>
      new IntlPluralDetector(
        Array(101)
          .fill(null)
          .map((_, i) => i)
      )
  )
  contaner.set('IKeyer', () => new UnderlineKeyer())
  contaner.set(
    'IPluralCleaner',
    () => new PluralCleaner(contaner.get('IPluralDetector'), contaner.get('IKeyer'))
  )
  contaner.set(
    'IPluralTransformer',
    () => new PluralTransformer(contaner.get('IPluralDetector'), contaner.get('IKeyer'))
  )
}
export default bootstrap
