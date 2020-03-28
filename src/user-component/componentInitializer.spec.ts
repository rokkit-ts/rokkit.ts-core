import { Injectable, Injector } from '@rokkit.ts/dependency-injection'
import { ComponentInitializer } from './componentInitializer'
import dependencyInjectionAssembler from '@rokkit.ts/dependency-injection/lib/dependency-injection-assembler/dependencyInjectionAssembler'

describe('ComponentInitializer', () => {
  it('should initialize a component only by name and return the instance', () => {
    // given
    const injector = new Injector(Component, [
      { index: 0, type: 'string', value: 'some data' }
    ])
    dependencyInjectionAssembler.registerInjector(injector)
    const componentInitializer = new ComponentInitializer()
    const componentName = 'Component'
    const expectedComponent = new Component('some data')
    // when
    const actualComponent = componentInitializer.initializeComponent(
      componentName
    )
    // then
    expect(actualComponent).toBeDefined()
    expect(actualComponent).toEqual(expectedComponent)
  })

  it('should initialize a component and return the instance', () => {
    // given
    const injector = new Injector(Component, [
      { index: 0, type: 'string', value: 'some data' }
    ])
    dependencyInjectionAssembler.createContext('sampleContext')
    dependencyInjectionAssembler.registerInjector(injector, 'sampleContext')
    const componentInitializer = new ComponentInitializer()
    const componentName = 'Component'
    const expectedComponent = new Component('some data')
    // when
    const actualComponent = componentInitializer.initializeComponent(
      componentName,
      'sampleContext'
    )
    // then
    expect(actualComponent).toBeDefined()
    expect(actualComponent).toEqual(expectedComponent)
  })

  it('should return undefined when there is is not component registered', () => {
    // given
    const componentInitializer = new ComponentInitializer()
    const componentName = 'UndefiedComponent'
    const expectedComponent = undefined
    // when
    const actualComponent = componentInitializer.initializeComponent(
      componentName
    )
    // then
    expect(actualComponent).not.toBeDefined()
    expect(actualComponent).toEqual(expectedComponent)
  })

  it('should initalize all component within a context', async () => {
    // given
    const componentInitializer = new ComponentInitializer()
    const contextName = 'sampleContext'
    // when
    const components = await componentInitializer.initializeComponents(
      contextName
    )
    // then
    expect(components).toBeDefined()
    expect(components.get('Component')).toBeDefined()
  })

  it('should get Componenents from ComponentInitializer', async () => {
    // given
    const componentInitializer = new ComponentInitializer()
    const contextName = 'sampleContext'
    // when
    const initComponents = await componentInitializer.initializeComponents(
      contextName
    )
    const components = componentInitializer.getComponents()

    // then
    expect(initComponents).toBeDefined()
    expect(components).toBeDefined()
    expect(components).toEqual(initComponents)
  })
})

class Component {
  private data: string

  constructor(data: string) {
    this.data = data
  }
}
