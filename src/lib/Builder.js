import TranslateManager, { COMMANDS } from './TranslateManager.js'
export default class Builder {
  _configure
  constructor(config) {
    this._configure = {
      config,
      commands: [],
      handlers: {},
    }
  }
  addCache(handler) {
    if (this._configure.commands.includes(COMMANDS.CACHE)) {
      return this
    }
    this._configure.commands.push(COMMANDS.CACHE)
    this._configure.handlers.cacheHandler = handler
    return this
  }
  addDiffAdd(handler) {
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
  addDiffRemove(handler) {
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
  addDiffUpdate(handler) {
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
  addMapAdd(handler) {
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
  addMapRemove(handler) {
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
  addMapUpdate(handler) {
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
