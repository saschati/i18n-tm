import Config from '@App/Config.js'
import Container from '@App/Dic/Container.js'
import utils from './bootstrap/utils.js'
import storages from './bootstrap/storages.js'
import readers from './bootstrap/readers.js'
import cachers from './bootstrap/cachers.js'
import differs from './bootstrap/differs.js'
import mappers from './bootstrap/mappers.js'
import remoteProviders from './bootstrap/remoteProviders.js'
import plurals from './bootstrap/plurals.js'
import caches from './bootstrap/handlers/caches.js'
import diffs from './bootstrap/handlers/diffs.js'
import maps from './bootstrap/handlers/maps.js'

export type Bootstrap = (contaner: Container, config: Config) => void

const bootstrap: Bootstrap = (contaner: Container, config: Config) => {
  utils(contaner, config)
  storages(contaner, config)
  readers(contaner, config)
  cachers(contaner, config)
  differs(contaner, config)
  mappers(contaner, config)
  remoteProviders(contaner, config)
  plurals(contaner, config)

  // Handlers
  caches(contaner, config)
  diffs(contaner, config)
  maps(contaner, config)
}

export default bootstrap
