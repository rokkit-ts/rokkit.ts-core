let app: unknown

export function RokkitRunner<T extends new (...args: any[]) => {}>(
  constructor: T
) {
  if (app === undefined) {
    app = new constructor()
  } else {
    throw new Error(`Do not use @RokkitRunner more often then once.`)
  }
  return class extends constructor {}
}
