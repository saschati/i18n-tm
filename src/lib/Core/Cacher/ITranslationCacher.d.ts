import type { CacheTransition } from '../../../types'

export default interface ITranslationCacher {
  set(cache: CacheTransition): Promise<void>
  get(): Promise<CacheTransition>
}
