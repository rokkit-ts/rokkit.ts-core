import * as path from "path";
import { AbstractModule } from "./abstractModule";

/**
 * @class ModuleLoader
 * This class loads and creates an instance for the provided module information.
 */
export class ModuleLoader {
  /**
   * @function filterNotUndefinedModules
   * @param module
   * Checks if an abstract module is not undefined.
   */
  public static filterNotUndefinedModules(
    module: AbstractModule | undefined
  ): module is AbstractModule {
    return module !== undefined;
  }

  /**
   * @function load
   * @param moduleName
   * @param mainClassName
   * @returns Promise<AbstractModule>
   * Imports and creates an instance for the provided module infroantion.
   * Returns the created instance of the module.
   */
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
}
