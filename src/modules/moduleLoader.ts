import { AbstractModule } from "./abstractModule";
import * as path from "path";

export class ModuleLoader {
  public load(moduleName: string, mainClassName: string): AbstractModule {
    const modulePath: string = path.resolve(`./node_modules/${moduleName}`);
    const loadedModule = require(modulePath);
    return new loadedModule[mainClassName]();
  }

  public static filterNotUndefinedModules(
    module: AbstractModule | undefined
  ): module is AbstractModule {
    return module !== undefined;
  }
}
