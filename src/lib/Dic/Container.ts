import Dependency from './Dependency.js'

export default class Container {
  private _dependencies: Map<string, unknown> = new Map()

  set<T>(key: string, factory: () => T, isSingelton = false): void {
    const instance = new Dependency<T>(factory)

    instance.isSingelton = isSingelton

    this._dependencies.set(key, instance)
  }

  get<T>(key: string): T {
    const dependency = this._dependencies.get(key) as Dependency<T>

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
