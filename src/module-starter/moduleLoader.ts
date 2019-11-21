import * as path from "path";
import { AbstractModule } from "./abstractModule";

export class ModuleLoader {
  public async load(
    moduleName: string,
    mainClassName: string
  ): Promise<AbstractModule> {
    const modulePath: string = path.resolve(`./node_modules/${moduleName}`);
    const loadedModule = await import(modulePath);
    if (loadedModule) {
      return Promise.resolve(new loadedModule[mainClassName]());
    }
    return Promise.reject();
  }

  public static filterNotUndefinedModules(
    module: AbstractModule | undefined
  ): module is AbstractModule {
    return module !== undefined;
  }
}
