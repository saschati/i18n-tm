export default class Dependency {
  factory
  instance = null
  isSingelton = false
  constructor(factory) {
    this.factory = factory
  }
}
