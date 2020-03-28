// tslint:disable:no-unused-expression

import { ModuleLoader } from './moduleLoader'

describe('ModuleLoader', () => {
  it('should load a module and a instance of the base class', async () => {
    // given
    const modulePath = '@rokkit.ts/abstract-module'
    const baseClass = 'AbstractModule'
    // when
    const moduleClass = await ModuleLoader.load(modulePath, baseClass)
    // then
    expect(moduleClass).toBeDefined()
  })

  it('should return undefined when module not found', async () => {
    // given
    const modulePath = '@rokkit.ts/some-new-module'
    const baseClass = 'BaseClass'
    // when
    const moduleClass = await ModuleLoader.load(modulePath, baseClass)
    // then
    expect(moduleClass).not.toBeDefined()
  })
})
