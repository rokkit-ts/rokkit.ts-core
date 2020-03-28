import {
  DependencyInjectionContext,
  Injector
} from '@rokkit.ts/dependency-injection'
import dependencyInjectionAssembler from '@rokkit.ts/dependency-injection/lib/dependency-injection-assembler/dependencyInjectionAssembler'

/**
 * @class ComponentInitializer
 * This class is used to initialize all registered injectors for the given context.
 * It stores all instances within the components map, which could be retrieved via a method.
 * The class will double check if there already is an instance before creating a new one.
 */
export class ComponentInitializer {
  private readonly components: Map<string, any>

  constructor() {
    this.components = new Map<string, any>()
  }

  /**
   * @function initializeComponents
   * @param contextName
   * @returns Promise<Map<string, any>>
   * Initializes all components based on the provided contextName (using default if undefined).
   * All instances will be stored into a map. This map will also be returned to directly work with it.
   */
  public async initializeComponents(
    contextName?: string
  ): Promise<Map<string, any>> {
    const depContext = this.getDependencyContext(contextName)
    await Promise.all(
      depContext.getAllInjectors().map(injector => {
        this.initializeComponentFromInjector(injector)
      })
    )
    return Promise.resolve(this.components)
  }

  /**
   * @function initializeComponent
   * @param componentName
   * @param contextName
   * @param dependencyContext
   * @returns any
   * Initializes the component based on the provided parameters stores it into the map and returns the instance.
   */
  public initializeComponent(
    componentName: string,
    contextName?: string,
    dependencyContext?: DependencyInjectionContext
  ): any {
    const depContext =
      dependencyContext || this.getDependencyContext(contextName)
    const injector = depContext.getInjector(componentName)
    if (!injector) {
      return undefined
    }
    return this.initializeComponentFromInjector(injector)
  }

  /**
   * @function getComponents
   * @returns Map<string, any>
   * Returns the map of all components' instances
   */
  public getComponents(): Map<string, any> {
    return this.components
  }

  /**
   * @function getComponent
   * @param componentName
   * Returns a component instance based on the given componentName.
   */
  public getComponent(componentName: string): any | undefined {
    return this.components.get(componentName)
  }

  private initializeComponentFromInjector<T extends object>(
    injector: Injector<T>
  ): any {
    let component = this.components.get(injector.ClassName)
    if (!component) {
      component = injector.createInstance()
      this.components.set(injector.ClassName, component)
    }
    return component
  }

  private getDependencyContext(
    contextName?: string
  ): DependencyInjectionContext {
    if (contextName) {
      const nullableContext:
        | DependencyInjectionContext
        | undefined = dependencyInjectionAssembler.retrieveContext(contextName)
      if (nullableContext) {
        return nullableContext
      }
    }
    return dependencyInjectionAssembler.retrieveDefaultContext()
  }
}
