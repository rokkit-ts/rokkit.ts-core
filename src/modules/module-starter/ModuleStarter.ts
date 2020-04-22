import { AbstractModule } from '@rokkit.ts/abstract-module'
import { PackageScanner } from './PackageScanner'
import { Module } from '../module-builder/ModuleBuilder'
import path from 'path'
import { LoggerFactory } from '@rokkit.ts/logger'

/**
 * @class ModuleStarter
 * This class provides the capablility to start other Rokkit.ts modules.
 * It checks the provided package.json of the user and than load all found rokkit.ts modules.
 */
export class ModuleStarter {
  private logger = LoggerFactory.create(ModuleStarter.name, true)
  public constructor(private readonly packageScanner: PackageScanner) {}

  /**
   * @function loadRokkitModules
   * @param modules: Module<unknown>[]
   * @returns Promise<void>
   * This function provides the functionality to scan and load the user's package.json.
   * Each module will be found based on the information provided in the rokkitModuleDeclaration file.
   * After scanning for potential modules, found modules will be imported.
   */
  public async loadModules(
    modules: Module<unknown>[]
  ): Promise<AbstractModule<unknown>[]> {
    return new Promise(async resolve => {
      const modulesLoaded = await Promise.all(
        modules.map(rokkitModule => {
          this.logger.info(
            `Loading module with name: ${rokkitModule.moduleName}`
          )
          if (this.packageScanner.isPackageInstalled(rokkitModule.moduleName)) {
            return this.loadModule(rokkitModule)
          } else {
            return undefined
          }
        })
      )
      resolve(modulesLoaded.filter(this.filterNotUndefinedModules))
    })
  }

  /**
   * @function loadModule
   * @param module: Module<T>
   * @returns Promise<AbstractModule>
   * Imports and creates an instance for the provided module infroantion.
   * Returns the created instance of the module.
   */
  public async loadModule<T>(
    module: Module<T>
  ): Promise<AbstractModule<T> | undefined> {
    const modulePath: string = path.resolve(
      `./node_modules/${module.moduleName}`
    )
    return new Promise(async resolve => {
      try {
        const importedEsModule = await import(modulePath)
        if (importedEsModule) {
          this.logger.info(
            `Successfully loaded module with name: ${module.moduleName}`
          )
          resolve(new importedEsModule[module.baseClass]())
        } else {
          this.logger.error(
            `Could not import module with name: ${module.moduleName}`
          )
          resolve(undefined)
        }
      } catch (error) {
        this.logger.error(
          `Error when loading module with name: ${module.moduleName}: ${error.message}`
        )
        resolve(undefined)
      }
    })
  }

  /**
   * Runs a module for rokkit.ts. The runModule method actually starts the procedure of a module
   * @function runModule
   * @param module :AbstractModule
   * @returns Promise<boolean>
   */
  public async runModule<T>(module: AbstractModule<T>): Promise<boolean> {
    return new Promise(async resolve => {
      try {
        await module.runModule()
        resolve(true)
      } catch (error) {
        resolve(false)
      }
    })
  }

  /**
   * ShutDown a module for rokkit.ts. The shutDown method actually stops all procedures of a module
   * @function shutDownModule
   * @param module :AbstractModule
   * @returns Promise<boolean>
   */
  public async shutDownModule<T>(module: AbstractModule<T>): Promise<boolean> {
    return new Promise(async resolve => {
      try {
        await module.shutdownModule()
        resolve(true)
      } catch (error) {
        resolve(false)
      }
    })
  }

  /**
   * @function filterNotUndefinedModules
   * @param module
   * Checks if an abstract module is not undefined.
   */
  private filterNotUndefinedModules(
    module: AbstractModule<unknown> | undefined
  ): module is AbstractModule<unknown> {
    return module !== undefined
  }
}
