import { Rokkit, RokkitModules, RokkitRunner } from '@rokkit.ts/core'

@RokkitRunner
export class App {
  constructor() {
    Rokkit.useModule(RokkitModules.WEB)
      .useDefaultConfiguration()
      .run()
  }
}
