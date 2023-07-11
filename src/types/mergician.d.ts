declare module 'mergician' {
  export type Mergician<T> = (...obj: T[]) => T

  const mergician: Mergician<T>

  export default mergician
}
