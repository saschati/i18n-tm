import UseCaseCacheCommand from './UseCase/Cache/Command.js'
import UseCaseDiffAddCommand from './UseCase/Diff/Add/Command.js'
import UseCaseDiffRemoveCommand from './UseCase/Diff/Remove/Command.js'
import UseCaseDiffUpdateCommand from './UseCase/Diff/Update/Command.js'
import UseCaseMapAddCommand from './UseCase/Map/Add/Command.js'
import UseCaseMapRemoveCommand from './UseCase/Map/Remove/Command.js'
import UseCaseMapUpdateCommand from './UseCase/Map/Update/Command.js'
import type UseCaseCacheHandler from './UseCase/Cache/Handler.js'
import type UseCaseDiffAddHandler from './UseCase/Diff/Add/Handler.js'
import type UseCaseDiffRemoveHandler from './UseCase/Diff/Remove/Handler.js'
import type UseCaseDiffUpdateHandler from './UseCase/Diff/Update/Handler.js'
import type UseCaseMapAddHandler from './UseCase/Map/Add/Handler.js'
import type UseCaseMapRemoveHandler from './UseCase/Map/Remove/Handler.js'
import type UseCaseMapUpdateHandler from './UseCase/Map/Update/Handler.js'
import type { ValueOf } from '../types'
import type Config from './Config.js'

export type TranslateManagerOptions = {
  config: Config
  commands: Array<ValueOf<typeof COMMANDS>>
  handlers: {
    // Cache
    cacheHandler?: UseCaseCacheHandler | undefined
    // Diff
    diffAddHandler?: UseCaseDiffAddHandler | undefined
    diffRemoveHandler?: UseCaseDiffRemoveHandler | undefined
    diffUpdateHandler?: UseCaseDiffUpdateHandler | undefined
    // Map
    mapAddHandler?: UseCaseMapAddHandler | undefined
    mapRemoveHandler?: UseCaseMapRemoveHandler | undefined
    mapUpdateHandler?: UseCaseMapUpdateHandler | undefined
  }
}

export const COMMANDS = {
  DIFF: 'diff',
  DIFF_ADD: 'diff_add',
  DIFF_REMOVE: 'diff_remove',
  DIFF_UPDATE: 'diff_update',
  CACHE: 'cache',
  MAP: 'map',
  MAP_ADD: 'map_add',
  MAP_REMOVE: 'map_remove',
  MAP_UPDATE: 'map_update',
} as const

export default class TranslateManager {
  private _commands: Array<ValueOf<typeof COMMANDS>>
  private _config: Config

  private _cacheHandler: UseCaseCacheHandler | undefined
  private _diffAddHandler: UseCaseDiffAddHandler | undefined
  private _diffRemoveHandler: UseCaseDiffRemoveHandler | undefined
  private _diffUpdateHandler: UseCaseDiffUpdateHandler | undefined
  private _mapAddHandler: UseCaseMapAddHandler | undefined
  private _mapRemoveHandler: UseCaseMapRemoveHandler | undefined
  private _mapUpdateHandler: UseCaseMapUpdateHandler | undefined

  constructor({ config, commands, handlers }: TranslateManagerOptions) {
    this._commands = commands
    this._config = config

    this._cacheHandler = handlers.cacheHandler
    this._diffAddHandler = handlers.diffAddHandler
    this._diffRemoveHandler = handlers.diffRemoveHandler
    this._diffUpdateHandler = handlers.diffUpdateHandler
    this._mapAddHandler = handlers.mapAddHandler
    this._mapRemoveHandler = handlers.mapRemoveHandler
    this._mapUpdateHandler = handlers.mapUpdateHandler
  }

  async cache(): Promise<boolean> {
    if (this._commands.includes(COMMANDS.CACHE) === false) {
      return false
    }

    if (!this._config.locale) {
      throw new Error('Locale cannot be null.')
    }

    if (!this._config.cacheFilename) {
      throw new Error('Cache filename is not defined in configuration.')
    }

    if (!this._config.cacheDir) {
      throw new Error('Cache dir is not defined in configuration.')
    }

    if (!this._config.transDir) {
      throw new Error('Translation directory is not defined in configuration.')
    }

    if (!this._cacheHandler) {
      throw new Error('Cache handler not defined.')
    }

    // Cache
    {
      const command = new UseCaseCacheCommand(
        this._config.locale,
        this._config.cacheFilename,
        this._config.cacheDir,
        this._config.transDir
      )

      await this._cacheHandler.handle(command)
    }

    return true
  }

  async map(): Promise<boolean> {
    if (this._commands.includes(COMMANDS.MAP) === false) {
      return false
    }

    if (!this._config.transDir) {
      throw new Error('Translation directory is not defined in configuration.')
    }

    // Add Map
    if (this._commands.includes(COMMANDS.MAP_ADD) === true) {
      if (!this._mapAddHandler) {
        throw new Error('Map add handler not defined.')
      }

      const command = new UseCaseMapAddCommand(
        this._config.getAddOutputDir(),
        this._config.transDir
      )

      await this._mapAddHandler.handle(command)
    }

    // Remove Map
    if (this._commands.includes(COMMANDS.MAP_REMOVE) === true) {
      if (!this._mapRemoveHandler) {
        throw new Error('Map remove handler not defined.')
      }

      const command = new UseCaseMapRemoveCommand(
        this._config.getRemoveOutputDir(),
        this._config.transDir
      )

      await this._mapRemoveHandler.handle(command)
    }

    // Update Map
    if (this._commands.includes(COMMANDS.MAP_UPDATE) === true) {
      if (!this._mapUpdateHandler) {
        throw new Error('Map update handler not defined.')
      }

      const command = new UseCaseMapUpdateCommand(
        this._config.getUpdateOutputDir(),
        this._config.transDir
      )

      await this._mapUpdateHandler.handle(command)
    }

    return true
  }

  async diff() {
    if (this._commands.includes(COMMANDS.DIFF) === false) {
      return false
    }

    if (!this._config.transDir) {
      throw new Error('Translation directory is not defined in configuration.')
    }

    if (!this._config.locale) {
      throw new Error('Locale is not defined in configuration.')
    }

    if (!this._config.locales || !this._config.locales.length) {
      throw new Error('Locales is not defined in configuration.')
    }

    if (this._commands.includes(COMMANDS.DIFF_ADD) === true) {
      if (!this._diffAddHandler) {
        throw new Error('Diff add handler not defined.')
      }

      const command = new UseCaseDiffAddCommand(
        this._config.locale,
        this._config.locales,
        this._config.transDir,
        this._config.getAddOutputDir(),
        this._config.withPlural,
        this._config.withRemoteProvider()
      )

      await this._diffAddHandler.handle(command)
    }

    if (this._commands.includes(COMMANDS.DIFF_REMOVE) === true) {
      if (!this._diffRemoveHandler) {
        throw new Error('Diff remove handler not defined.')
      }

      const command = new UseCaseDiffRemoveCommand(
        this._config.locale,
        this._config.locales,
        this._config.transDir,
        this._config.getRemoveOutputDir(),
        this._config.withPlural
      )

      await this._diffRemoveHandler.handle(command)
    }

    if (this._commands.includes(COMMANDS.DIFF_UPDATE) === true) {
      if (!this._diffUpdateHandler) {
        throw new Error('Diff update handler not defined.')
      }

      const command = new UseCaseDiffUpdateCommand(
        this._config.locale,
        this._config.locales,
        this._config.transDir,
        this._config.getUpdateOutputDir(),
        this._config.withPlural,
        this._config.withRemoteProvider()
      )

      await this._diffUpdateHandler.handle(command)
    }

    return true
  }
}
