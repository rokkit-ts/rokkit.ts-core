import { Rokkit } from './Rokkit'
import { RokkitServerOptions } from '@rokkit.ts/web'
import { RokkitRunner } from './Rokkit'
import { rokkitStarter } from './RokkitStarter'

export interface Module<T> {
  configuration: T
  baseClass: string
  moduleName: string
}

export enum RokkitModules {
  WEB
}

export class ModuleBuilder<T> {
  public static WEB = new ModuleBuilder<RokkitServerOptions>(
    '@rokkit.ts/web',
    'WebStarter',
    { port: 8080 }
  )
  private module: Module<T>

  private constructor(moduleName: string, baseClass: string, defaultConfig: T) {
    this.module = { configuration: defaultConfig, baseClass, moduleName }
  }

  public static builderFor(module: RokkitModules) {
    switch (module) {
      case RokkitModules.WEB:
        return this.WEB
    }
  }

  public get Module() {
    return this.module
  }

  public useConfiguration(config: T): RokkitRunner {
    this.module.configuration = config
    rokkitStarter.useModule(this.module)
    return Rokkit
  }

  public useDefaultConfiguration(): RokkitRunner {
    rokkitStarter.useModule(this.module)
    return Rokkit
  }
}
