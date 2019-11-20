import dependencyInjectionAssembler from "@rokkit.ts/dependency-injection/lib/dependency-injection-assembler/dependencyInjectionAssembler";
import {
  DependencyInjectionContext,
  Injector
} from "@rokkit.ts/dependency-injection";

export class ComponentInitializer {
  private readonly components: Map<string, any>;

  constructor() {
    this.components = new Map<string, any>();
  }

  public initializeComponents(contextName?: string): Map<string, any> {
    const depContext = this.getDependencyContext(contextName);
    depContext.getAllInjectors().forEach(injector => {
      this.initializeComponentFromInjector(injector);
    });
    return this.components;
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
