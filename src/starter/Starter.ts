import { Module } from '../modules'
import { PackageScanner, ModuleStarter } from '../modules/module-starter'
import { ComponentScanner } from '../components'
import { performance } from 'perf_hooks'

class Starter {
  private modulesToUse = new Map<string, Module<any>>()
  private readonly packageScanner: PackageScanner
  private readonly moduleStarter: ModuleStarter

  constructor() {
    this.packageScanner = new PackageScanner('./package.json')
    this.moduleStarter = new ModuleStarter(this.packageScanner)
  }

  public useModule<T>(module: Module<T>): Starter {
    this.modulesToUse.set(module.moduleName, module)
    return this
  }

  public async run(): Promise<void> {
    const timeStampStarted = performance.now()
    console.log('starting rokkit')
    // execute user compoent scan
    const componentsPaths = await ComponentScanner.importUserComponents()
    // log pathes
    componentsPaths.forEach(a => console.log(a))

    // load modules
    const loadedModules = await this.moduleStarter.loadModules(
      Array.from(this.modulesToUse.values())
    )

    // run modules
    await Promise.all(
      loadedModules.map(module => this.moduleStarter.runModule(module))
    )

    // started the framework :)
    console.log(
      `Rokkit.ts started in: ${(performance.now() - timeStampStarted).toFixed(
        2
      )}ms`
    )
  }
}

export const starter = new Starter()
