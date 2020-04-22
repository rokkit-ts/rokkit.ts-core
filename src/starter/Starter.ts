import { Module } from '../modules'
import { PackageScanner, ModuleStarter } from '../modules/module-starter'
import { ComponentScanner } from '../components'
import { performance } from 'perf_hooks'
import { LoggerFactory } from '@rokkit.ts/logger'

class Starter {
  private modulesToUse = new Map<string, Module<any>>()
  private readonly starterLogger = LoggerFactory.create('RokkitStarter', true)

  public useModule<T>(module: Module<T>): Starter {
    this.modulesToUse.set(module.moduleName, module)
    return this
  }

  public async run(): Promise<void> {
    this.starterLogger.info('Starting Rokkit.ts')
    const timeStampStarted = performance.now()
    const packageScanner = new PackageScanner('./package.json')
    const moduleStarter = new ModuleStarter(packageScanner)

    // execute user compoent scan
    this.starterLogger.info('Scanning user components')
    const componentsPaths = await ComponentScanner.importUserComponents()
    // log pathes
    await Promise.all(
      componentsPaths.map(component => {
        this.starterLogger.info(
          `Found: ${component?.substring(
            component.lastIndexOf('/') + 1,
            component.lastIndexOf('.')
          )}`
        )
        this.starterLogger.debug(`Exact path: ${component}`)
      })
    )

    // load modules
    this.starterLogger.info('Loading rokkit modules')
    const loadedModules = await moduleStarter.loadModules(
      Array.from(this.modulesToUse.values())
    )

    // run modules
    this.starterLogger.info('Running rokkit modules')
    await Promise.all(
      loadedModules.map(module => moduleStarter.runModule(module))
    )

    // started the framework :)
    this.starterLogger.info(
      `Rokkit.ts started in: ${(performance.now() - timeStampStarted).toFixed(
        2
      )}ms`
    )
  }
}

export const starter = new Starter()
