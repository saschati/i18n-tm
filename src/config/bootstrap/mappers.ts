import AbstractMapper from '@App/Core/Mapper/AbstractMapper.js'
import CleanMapper from '@App/Core/Mapper/CleanMapper.js'
import MargeMapper from '@App/Core/Mapper/MargeMapper.js'
import type IReader from '@App/Core/Reader/IReader.js'
import type IStorage from '@App/Core/Storage/IStorage.js'
import type { TranslationDiffObject } from '../../types'
import type { Bootstrap } from '../bootstrap.js'

const bootstrap: Bootstrap = (contaner) => {
  contaner.set<AbstractMapper>(
    'CleanMapper',
    () =>
      new CleanMapper(
        contaner.get<IReader<TranslationDiffObject>>('DiffIReader'),
        contaner.get<IReader<TranslationDiffObject>>('TranslationIReader'),
        contaner.get<IStorage<TranslationDiffObject>>('TranslationIStorage')
      )
  )
  contaner.set<AbstractMapper>(
    'MargeMapper',
    () =>
      new MargeMapper(
        contaner.get<IReader<TranslationDiffObject>>('DiffIReader'),
        contaner.get<IReader<TranslationDiffObject>>('TranslationIReader'),
        contaner.get<IStorage<TranslationDiffObject>>('TranslationIStorage')
      )
  )
}

export default bootstrap
