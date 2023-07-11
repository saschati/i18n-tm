import TranslateManager, { COMMANDS } from './TranslateManager.js'
import type UseCaseCacheHandler from './UseCase/Cache/Handler.js'
import type UseCaseDiffAddHandler from './UseCase/Diff/Add/Handler.js'
import type UseCaseDiffRemoveHandler from './UseCase/Diff/Remove/Handler.js'
import type UseCaseDiffUpdateHandler from './UseCase/Diff/Update/Handler.js'
import type UseCaseMapAddHandler from './UseCase/Map/Add/Handler.js'
import type UseCaseMapRemoveHandler from './UseCase/Map/Remove/Handler.js'
import type UseCaseMapUpdateHandler from './UseCase/Map/Update/Handler.js'
import type { ValueOf } from '../types'
import type Config from './Config.js'

export type BuilderConfigure = {
  commands: Array<ValueOf<typeof COMMANDS>>
  config: Config
  handlers: {
    // Cache
    cacheHandler?: UseCaseCacheHandler
    // Diff
    diffAddHandler?: UseCaseDiffAddHandler
    diffRemoveHandler?: UseCaseDiffRemoveHandler
    diffUpdateHandler?: UseCaseDiffUpdateHandler
    // Map
    mapAddHandler?: UseCaseMapAddHandler
    mapRemoveHandler?: UseCaseMapRemoveHandler
    mapUpdateHandler?: UseCaseMapUpdateHandler
  }
}

export default class Builder {
  private _configure: BuilderConfigure

  constructor(config: Config) {
    this._configure = {
      config,
      commands: [],
      handlers: {},
    }
  }

  addCache(handler: UseCaseCacheHandler) {
    if (this._configure.commands.includes(COMMANDS.CACHE)) {
      return this
    }

    this._configure.commands.push(COMMANDS.CACHE)

    this._configure.handlers.cacheHandler = handler

    return this
  }

  addDiffAdd(handler: UseCaseDiffAddHandler): Builder {
    if (this._configure.commands.includes(COMMANDS.DIFF_ADD)) {
      return this
    }

    if (!this._configure.commands.includes(COMMANDS.DIFF)) {
      this._configure.commands.push(COMMANDS.DIFF)
    }

    this._configure.commands.push(COMMANDS.DIFF_ADD)

    this._configure.handlers.diffAddHandler = handler

    return this
  }

  addDiffRemove(handler: UseCaseDiffRemoveHandler): Builder {
    if (this._configure.commands.includes(COMMANDS.DIFF_REMOVE)) {
      return this
    }

    if (!this._configure.commands.includes(COMMANDS.DIFF)) {
      this._configure.commands.push(COMMANDS.DIFF)
    }

    this._configure.commands.push(COMMANDS.DIFF_REMOVE)

    this._configure.handlers.diffRemoveHandler = handler

    return this
  }

  addDiffUpdate(handler: UseCaseDiffUpdateHandler): Builder {
    if (this._configure.commands.includes(COMMANDS.DIFF_UPDATE)) {
      return this
    }

    if (!this._configure.commands.includes(COMMANDS.DIFF)) {
      this._configure.commands.push(COMMANDS.DIFF)
    }

    this._configure.commands.push(COMMANDS.DIFF_UPDATE)

    this._configure.handlers.diffUpdateHandler = handler

    return this
  }

  addMapAdd(handler: UseCaseMapAddHandler): Builder {
    if (this._configure.commands.includes(COMMANDS.MAP_ADD)) {
      return this
    }

    if (!this._configure.commands.includes(COMMANDS.MAP)) {
      this._configure.commands.push(COMMANDS.MAP)
    }

    this._configure.commands.push(COMMANDS.MAP_ADD)

    this._configure.handlers.mapAddHandler = handler

    return this
  }

  addMapRemove(handler: UseCaseMapRemoveHandler): Builder {
    if (this._configure.commands.includes(COMMANDS.MAP_REMOVE)) {
      return this
    }

    if (!this._configure.commands.includes(COMMANDS.MAP)) {
      this._configure.commands.push(COMMANDS.MAP)
    }

    this._configure.commands.push(COMMANDS.MAP_REMOVE)

    this._configure.handlers.mapRemoveHandler = handler

    return this
  }

  addMapUpdate(handler: UseCaseMapUpdateHandler): Builder {
    if (this._configure.commands.includes(COMMANDS.MAP_UPDATE)) {
      return this
    }

    if (!this._configure.commands.includes(COMMANDS.MAP)) {
      this._configure.commands.push(COMMANDS.MAP)
    }

    this._configure.commands.push(COMMANDS.MAP_UPDATE)

    this._configure.handlers.mapUpdateHandler = handler

    return this
  }

  build() {
    return new TranslateManager({
      config: this._configure.config,
      commands: this._configure.commands,
      handlers: this._configure.handlers,
    })
  }
}
