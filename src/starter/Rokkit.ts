import { ModuleBuilder, RokkitModules } from '../modules'
import { starter } from './Starter'

export class RokkitRunner {
  public useModule(module: RokkitModules) {
    return ModuleBuilder.builderFor(module)
  }
  public run(): void {
    starter.run()
  }
}

export const Rokkit = new RokkitRunner()
