export default class Dependency<T> {
  public instance: T | null = null
  public isSingelton = false

  constructor(public factory: () => T) {}
}
