import { AbstractModule } from "@rokkit.ts/abstract-module";
import * as path from "path";

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
  public static async load(
    moduleName: string,
    mainClassName: string
  ): Promise<AbstractModule | undefined> {
    const modulePath: string = path.resolve(`./node_modules/${moduleName}`);
    try {
      const loadedModule = await import(modulePath);
      if (loadedModule) {
        return Promise.resolve(new loadedModule[mainClassName]());
      } else {
        return Promise.resolve(undefined);
      }
    } catch (error) {
      return Promise.resolve(undefined);
    }
  }
}
