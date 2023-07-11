import CleanMapper from '@App/Core/Mapper/CleanMapper.js'
import MargeMapper from '@App/Core/Mapper/MargeMapper.js'
const bootstrap = (contaner) => {
  contaner.set(
    'CleanMapper',
    () =>
      new CleanMapper(
        contaner.get('DiffIReader'),
        contaner.get('TranslationIReader'),
        contaner.get('TranslationIStorage')
      )
  )
  contaner.set(
    'MargeMapper',
    () =>
      new MargeMapper(
        contaner.get('DiffIReader'),
        contaner.get('TranslationIReader'),
        contaner.get('TranslationIStorage')
      )
  )
}
export default bootstrap
