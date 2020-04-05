import { Module } from './ModuleBuilder'

class RokkitStarter {
  private modulesToUse = new Map<string, Module<any>>()

  public useModule<T>(module: Module<T>): RokkitStarter {
    this.modulesToUse.set(module.moduleName, module)
    return this
  }

  public run(): void {
    // execute user compoent scan
    // run modules
    console.log('starting rokkit')
    this.modulesToUse.forEach(a => console.log(a))
  }
}

export const rokkitStarter = new RokkitStarter()
