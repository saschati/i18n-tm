import Dependency from './Dependency.js'
export default class Container {
  _dependencies = new Map()
  set(key, factory, isSingelton = false) {
    const instance = new Dependency(factory)
    instance.isSingelton = isSingelton
    this._dependencies.set(key, instance)
  }
  get(key) {
    const dependency = this._dependencies.get(key)
    if (!dependency) {
      throw new Error(`Dependency with key ${key} not found.`)
    }
    if (dependency.isSingelton === true) {
      dependency.instance ??= dependency.factory()
      return dependency.instance
    }
    return dependency.factory()
  }
}
