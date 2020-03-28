import { PackageScanner } from './packageScanner'
import { RokkitModuleStarter } from './rokkitModuleStarter'
import { ModuleLoader } from './moduleLoader'
import { AbstractModule } from '@rokkit.ts/abstract-module'

jest.mock('./packageScanner', () => ({
  PackageScanner: jest.fn().mockImplementation(() => ({
    isPackageInstalled: jest.fn().mockReturnValue(true)
  }))
}))

jest.mock('../resources/rokkitModuleDeclarations', () => ({
  rokkitModules: [
    {
      mainClass: 'AbstractModule',
      moduleName: '@rokkit.ts/abstract-module'
    }
  ]
}))

describe('RokkitModuleStarter', () => {
  it('should load the found module and return the reference of this module', async () => {
    // given
    const rokkitModuleStarter = new RokkitModuleStarter(
      new PackageScanner('./package.json')
    )
    // when
    await rokkitModuleStarter.loadRokkitModules()
    const actualModules = rokkitModuleStarter.ModuleReferences
    // then
    expect(actualModules).toBeDefined()
    expect(actualModules).toHaveLength(1)
  })

  it('should call run on the loaded modules', async () => {
    // given
    const runModuleMock = jest.fn()
    jest.spyOn(ModuleLoader, 'load').mockResolvedValue({
      injectDependencies: jest.fn() as any,
      runModule: runModuleMock as any,
      shoutDownModule: jest.fn() as any
    } as AbstractModule)
    const rokkitModuleStarter = new RokkitModuleStarter(
      new PackageScanner('./package.json')
    )
    // when
    await rokkitModuleStarter.loadRokkitModules()
    await rokkitModuleStarter.runModules({ someConfig: 'conf' })
    // then
    expect(runModuleMock).toBeCalledTimes(1)
    expect(runModuleMock).toBeCalledWith({ someConfig: 'conf' })
  })

  it('should inject dependencies on the loaded modules', async () => {
    // given
    const injectDependenciesMock = jest.fn()
    jest.spyOn(ModuleLoader, 'load').mockResolvedValue({
      injectDependencies: injectDependenciesMock as any,
      runModule: jest.fn() as any,
      shoutDownModule: jest.fn() as any
    } as AbstractModule)
    const rokkitModuleStarter = new RokkitModuleStarter(
      new PackageScanner('./package.json')
    )
    // when
    await rokkitModuleStarter.loadRokkitModules()
    await rokkitModuleStarter.injectDependencies(new Map())
    // then
    expect(injectDependenciesMock).toBeCalledTimes(1)
    expect(injectDependenciesMock).toBeCalledWith(new Map())
  })

  it('should call shutDown on the loaded modules', async () => {
    // given
    const shoutDownModule = jest.fn()
    jest.spyOn(ModuleLoader, 'load').mockResolvedValue({
      injectDependencies: jest.fn() as any,
      runModule: jest.fn() as any,
      shoutDownModule: shoutDownModule as any
    } as AbstractModule)
    const rokkitModuleStarter = new RokkitModuleStarter(
      new PackageScanner('./package.json')
    )
    // when
    await rokkitModuleStarter.loadRokkitModules()
    await rokkitModuleStarter.shutDownModules()
    // then
    expect(shoutDownModule).toBeCalledTimes(1)
  })
})
