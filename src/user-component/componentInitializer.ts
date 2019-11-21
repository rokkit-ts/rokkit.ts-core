import {
  DependencyInjectionContext,
  Injector
} from "@rokkit.ts/dependency-injection";
import dependencyInjectionAssembler from "@rokkit.ts/dependency-injection/lib/dependency-injection-assembler/dependencyInjectionAssembler";

export class ComponentInitializer {
  private readonly components: Map<string, any>;

  constructor() {
    this.components = new Map<string, any>();
  }

  public async initializeComponents(
    contextName?: string
  ): Promise<Map<string, any>> {
    const depContext = this.getDependencyContext(contextName);
    await Promise.all(
      depContext.getAllInjectors().map(injector => {
        this.initializeComponentFromInjector(injector);
      })
    );
    return Promise.resolve(this.components);
  }

  public initializeComponent(
    componentName: string,
    contextName?: string,
    dependencyContext?: DependencyInjectionContext
  ): any {
    const depContext =
      dependencyContext || this.getDependencyContext(contextName);
    const injector = depContext.getInjector(componentName);
    if (!injector) {
      return undefined;
    }
    return this.initializeComponentFromInjector(injector);
  }

  public getComponents(): Map<string, any> {
    return this.components;
  }

  public getComponent(componentName: string): any | undefined {
    return this.components.get(componentName);
  }

  private initializeComponentFromInjector<T extends object>(
    injector: Injector<T>
  ): any {
    let component = this.components.get(injector.ClassName);
    if (!component) {
      component = injector.createInstance();
      this.components.set(injector.ClassName, component);
    }
    return component;
  }

  private getDependencyContext(
    contextName?: string
  ): DependencyInjectionContext {
    if (contextName) {
      const nullableContext:
        | DependencyInjectionContext
        | undefined = dependencyInjectionAssembler.retrieveContext(contextName);
      if (nullableContext) {
        return nullableContext;
      }
    }
    return dependencyInjectionAssembler.retrieveDefaultContext();
  }
}
