import { ModuleBuilder, RokkitModules } from './ModuleBuilder'
import { rokkitStarter } from './RokkitStarter'

export class RokkitRunner {
  public useModule(module: RokkitModules) {
    return ModuleBuilder.builderFor(module)
  }
  public run(): void {
    rokkitStarter.run()
  }
}

export const Rokkit = new RokkitRunner()

Rokkit.useModule(RokkitModules.WEB)
  .useDefaultConfiguration()
  .run()
