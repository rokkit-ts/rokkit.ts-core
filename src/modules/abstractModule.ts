import { DependencyInjectionContext } from "@rokkit.ts/dependency-injection";

export abstract class AbstractModule {
  public abstract async initializeModule(configuration: any): Promise<void>;
  public abstract async injectDependencies(
    dependencyInjectionContext: DependencyInjectionContext
  ): Promise<void>;
  public abstract async shoutDownModule(): Promise<void>;
}
