export type TranslationDiffObject = {
  [key: string]: string | TranslationDiffObject | Array
}

export type TranslationDiffObjectDelete = {
  [key: string]: null | TranslationDiffObjectDelete
}

export type CacheTransition = {
  [key: string]: {
    [key: string]: TranslationDiffObject
  }
}

export type ValueOf<T> = T[keyof T]
