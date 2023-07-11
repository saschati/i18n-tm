#!/usr/bin/env node
import path from 'path'
import meow from 'meow'
import fs from 'fs'
import bootstrap from '@config/bootstrap.js'
import Config from '@App/Config.js'
import Container from '@App/Dic/Container.js'
import Builder from '@App/Builder.js'
const customConfigPath = path.resolve('.i18next-tm.js')
let customConfig
if (fs.existsSync(customConfigPath) === true) {
  try {
    const mod = await import(customConfigPath)
    customConfig = mod.default || mod
  } catch (error) {
    console.error(`Error importing ${customConfigPath}, config skip because:`, error)
  }
}
const cli = meow(
  `
	Usage: i18next-tm [options]

	Options:

      --diff, -d

        Compare the files of the first language with the following
        ones transferred and generate the corresponding manifest.
        Default runs all types of diff: add, update, remove.
        Example: --diff, or --diff=add,remove,update


      --locales, -l

        Specifies which localization will be compared to which localization
        when comparing localizations or checking translations.
        Example: --locales=en:uk,pl,ar - where "en" is compared "uk,pl,ar"


      --trans-path, -t-p

        Specifies the path to the folder where the localization language
        files are located. This option is used to tell the command where
        to find the translation files that are used to compare against the
        source files to find any missing or outdated translations.
        Example: --trans-path=path/to/translations


      --translate, -t

        Data translation after comparison by the selected remote provider.
        Example: --translate=ms
        Remote Providers:
          - ms: Microsoft Translate


      --plural, -p

        Comparing will check the presence of a plural in the translation.


      --trans-format, -t-f

        Specifies the format of the translation files to be compared.
        This option is used to tell the command how to parse the
        translation files in order to compare them against the source files.
        Default: json


      --diff-format, -d-f

        Specifies the format of the translation files in which the changes (diffs)
        will be saved after comparison. This option is used to tell the command
        how to format and save the updated translations after they have been
        compared against the source files.
        Default: json


      --output-path, -o

        Sspecifies the directory where the translation files will
        be placed after they have been generated.
        Example: --output-path=./path/to/output/translation
        Default: ./i18next-tm/diff


      --map, -m

        Combine comparison files with original files.
        Default runs all types of diff: add, update, remove.
        Example: --map, or --map=add,remove,update
        

      --cache, -c

        Save language cache to use language update comparisons and remove diff plural.
        Example: --cache=en


      --cache-path, -c-p

        Specifies the file path where a cache file should be stored or retrieved.
        Example: --cache=./path/to/cache
        Default: ./i18next-tm/cache


      --cache-filename, -c-f

        Specifies the file path where a cache file should be stored or retrieved.
        Default: i18next-tm.cache.json
`,
  {
    importMeta: import.meta,
    flags: {
      diff: {
        alias: 'd',
        type: 'string',
        isRequired: (flags) => !('map' in flags) && !('cache' in flags),
      },
      locales: {
        alias: 'l',
        type: 'string',
        isRequired: (flags) => 'diff' in flags && (!customConfig?.locale || !customConfig?.locales),
      },
      transPath: {
        alias: 't-p',
        type: 'string',
        isRequired: (flags) =>
          ('diff' in flags || 'map' in flags || 'cache' in flags) && !customConfig?.transPath,
      },
      translate: {
        alias: 't',
        type: 'string',
        default: customConfig?.remoteProvider || 'none',
      },
      plural: {
        alias: 'p',
        type: 'boolean',
        default: Boolean(customConfig?.plural),
      },
      transFormat: {
        alias: 't-f',
        type: 'string',
        default: customConfig?.transFormat || 'json',
      },
      diffFormat: {
        alias: 'd-f',
        type: 'string',
        default: customConfig?.diffFormat || 'json',
      },
      outputPath: {
        alias: 'o-p',
        type: 'string',
        default: customConfig?.outputPath || path.resolve('i18next-tm', 'diff'),
      },
      map: {
        alias: 'm',
        type: 'string',
      },
      cache: {
        alias: 'c',
        type: 'string',
      },
      cachePath: {
        alias: 'c-p',
        type: 'string',
        default: customConfig?.cachePath || path.resolve('i18next-tm', 'cache'),
      },
      cacheFilename: {
        alias: 'c-f',
        type: 'string',
        default: customConfig?.cacheFilename || 'i18next-tm.cache.json',
      },
    },
  }
)
const flags = cli.flags
const remotePrividers = ['ms', 'none']
const transFormats = ['json']
const diffFormats = ['json']
const costumLocale = customConfig?.locale || undefined
const costumLocales = customConfig?.locales || ''
const transDir = flags.transPath || customConfig?.transPath
const remoteProvider = !remotePrividers.includes(flags.translate) ? 'none' : flags.translate
const transFormat = !transFormats.includes(flags.transFormat) ? 'json' : flags.transFormat
const diffFormat = !diffFormats.includes(flags.diffFormat) ? 'json' : flags.diffFormat
const [locale = costumLocale, locales = costumLocales] = (flags.locales || '')
  .split(':')
  .map((v) => (!v ? undefined : v))
const config = new Config({
  locale: locale || flags.cache,
  locales: Array.isArray(locales) ? locales : locales.split(','),
  transDir: transDir ? path.resolve(transDir) : undefined,
  outputDir: path.resolve(flags.outputPath),
  cacheDir: path.resolve(flags.cachePath),
  cacheFilename: flags.cacheFilename,
  transFormat,
  diffFormat,
  remoteProvider,
  withPlural: flags.plural,
  msApiKey: process.env.I18NEXT_TS_MS_API_KEY,
  msApiRegion: process.env.I18NEXT_TS_MS_API_REGION,
})
const container = new Container()
bootstrap(container, config)
if (customConfig?.bootstrap !== undefined) {
  customConfig.bootstrap(container, config)
}
const builder = new Builder(config)
if ('cache' in flags || ('map' in flags && customConfig?.cacheAfterMap === true)) {
  builder.addCache(container.get('Cache\\Handler'))
}
if ('diff' in flags) {
  if (flags.diff === '') {
    builder.addDiffAdd(container.get('Diff\\Add\\Handler'))
    builder.addDiffRemove(container.get('Diff\\Remove\\Handler'))
    builder.addDiffUpdate(container.get('Diff\\Update\\Handler'))
  } else {
    const handlers = flags.diff?.split(',') || []
    if (handlers.includes('add')) {
      builder.addDiffAdd(container.get('Diff\\Add\\Handler'))
    }
    if (handlers.includes('remove')) {
      builder.addDiffRemove(container.get('Diff\\Remove\\Handler'))
    }
    if (handlers.includes('update')) {
      builder.addDiffUpdate(container.get('Diff\\Update\\Handler'))
    }
  }
}
if ('map' in flags) {
  if (flags.map === '') {
    builder.addMapAdd(container.get('Map\\Add\\Handler'))
    builder.addMapRemove(container.get('Map\\Remove\\Handler'))
    builder.addMapUpdate(container.get('Map\\Update\\Handler'))
  } else {
    const handlers = flags.map?.split(',') || []
    if (handlers.includes('add')) {
      builder.addMapAdd(container.get('Map\\Add\\Handler'))
    }
    if (handlers.includes('remove')) {
      builder.addMapRemove(container.get('Map\\Remove\\Handler'))
    }
    if (handlers.includes('update')) {
      builder.addMapUpdate(container.get('Map\\Update\\Handler'))
    }
  }
}
const translator = builder.build()
const main = async () => {
  const diffStatus = await translator.diff()
  if (diffStatus === true) {
    console.log('Comparison of translation files ended successfully.')
  }
  const mapStatus = await translator.map()
  if (mapStatus === true) {
    console.log('Merging of translation files was completed successfully.')
  }
  const cahceStatus = await translator.cache()
  if (cahceStatus === true) {
    console.log('The translation files were cached successfully.')
  }
}
main()
