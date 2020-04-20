import { PackageScanner } from './PackageScanner'
import { ModuleStarter } from './ModuleStarter'
import { Module } from '../module-builder/ModuleBuilder'
import { mocked } from 'ts-jest/dist/util/testing'

jest.mock('@rokkit.ts/web', () => {
  return {
    WebStarter: jest.fn().mockImplementation(() => ({
      runModule: jest.fn(),
      shutdownModule: jest.fn()
    }))
  }
})

jest.mock('./PackageScanner', () => ({
  PackageScanner: jest.fn().mockImplementation(() => ({
    isPackageInstalled: jest.fn().mockReturnValue(true)
  }))
}))

describe('ModuleStarter', () => {
  it('should load the modules and return the reference of this module', async () => {
    // given
    const rokkitModuleStarter = new ModuleStarter(
      new PackageScanner('./package.json')
    )
    const module: Module<any> = {
      configuration: { test: 'bla' },
      moduleName: '@rokkit.ts/web',
      baseClass: 'WebStarter'
    }
    // when
    const actualModules = await rokkitModuleStarter.loadModules([module])
    // then
    expect(actualModules).toBeDefined()
    expect(actualModules).toHaveLength(1)
  })

  it('should load the module and return the reference of this module', async () => {
    // given
    const rokkitModuleStarter = new ModuleStarter(
      new PackageScanner('./package.json')
    )
    const module: Module<any> = {
      configuration: { test: 'bla' },
      moduleName: '@rokkit.ts/web',
      baseClass: 'WebStarter'
    }
    // when
    const actualModule = await rokkitModuleStarter.loadModule(module)
    // then
    expect(actualModule).toBeDefined()
  })

  it('should call run on the module', async () => {
    // given
    const rokkitModuleStarter = new ModuleStarter(
      new PackageScanner('./package.json')
    )
    const module: Module<any> = {
      configuration: { test: 'bla' },
      moduleName: '@rokkit.ts/web',
      baseClass: 'WebStarter'
    }
    const moduleLoaded = await rokkitModuleStarter.loadModule(module)
    // when
    if (moduleLoaded) {
      const isModuleRunning = await rokkitModuleStarter.runModule(moduleLoaded)
      // then
      expect(isModuleRunning).toBe(true)
      expect(moduleLoaded.runModule).toHaveBeenCalledTimes(1)
    }
  })

  it('should call run on the module and return false on error', async () => {
    // given
    const rokkitModuleStarter = new ModuleStarter(
      new PackageScanner('./package.json')
    )
    const module: Module<any> = {
      configuration: { test: 'bla' },
      moduleName: '@rokkit.ts/web',
      baseClass: 'WebStarter'
    }
    const moduleLoaded = await rokkitModuleStarter.loadModule(module)
    mocked(moduleLoaded!.runModule).mockImplementationOnce(() => {
      throw new Error()
    })
    // when
    const isModuleRunning = await rokkitModuleStarter.runModule(moduleLoaded!)
    // then
    expect(isModuleRunning).toBe(false)
    expect(moduleLoaded!.runModule).toHaveBeenCalledTimes(1)
  })

  it('should call shutDown on the module', async () => {
    // given
    const rokkitModuleStarter = new ModuleStarter(
      new PackageScanner('./package.json')
    )
    const module: Module<any> = {
      configuration: { test: 'bla' },
      moduleName: '@rokkit.ts/web',
      baseClass: 'WebStarter'
    }
    const moduleLoaded = await rokkitModuleStarter.loadModule(module)
    // when
    const isModuleShuttingDown = await rokkitModuleStarter.shutDownModule(
      moduleLoaded!
    )
    // then
    expect(isModuleShuttingDown).toBe(true)
    expect(moduleLoaded!.shutdownModule).toHaveBeenCalledTimes(1)
  })

  it('should call shutDown on the module and return false on error', async () => {
    // given
    const rokkitModuleStarter = new ModuleStarter(
      new PackageScanner('./package.json')
    )
    const module: Module<any> = {
      configuration: { test: 'bla' },
      moduleName: '@rokkit.ts/web',
      baseClass: 'WebStarter'
    }
    const moduleLoaded = await rokkitModuleStarter.loadModule(module)
    mocked(moduleLoaded!.shutdownModule).mockImplementationOnce(() => {
      throw new Error()
    })
    // when
    const isModuleRunning = await rokkitModuleStarter.shutDownModule(
      moduleLoaded!
    )
    // then
    expect(isModuleRunning).toBe(false)
    expect(moduleLoaded!.shutdownModule).toHaveBeenCalledTimes(1)
  })
})
