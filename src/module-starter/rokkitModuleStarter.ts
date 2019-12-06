import { rokkitModules } from "../resource/rokkitModuleDeclarations";
import { AbstractModule } from "./abstractModule";
import { ModuleLoader } from "./moduleLoader";
import { PackageScanner } from "./packageScanner";

/**
 * @class RokkitModuleStarter
 * This class provides the capablility to start other Rokkit.ts modules.
 * It checks the provided package.json of the user and than load all found rokkit.ts modules.
 */
export class RokkitModuleStarter {
  private moduleReferences: AbstractModule[];

  public constructor() {
    this.moduleReferences = [];
  }

  /**
   * @function loadRokkitModules
   * @param pathToUserPackageJson
   * @returns Promise<void>
   * This function provides the functionallity to scan and load the user's package.json.
   * Each module will be found based on the information provided in the rokkitModuleDeclaration file.
   * After scanning for potential modules, found modules will be imported.
   */
  public async loadRokkitModules(pathToUserPackageJson: string): Promise<void> {
    const packageScanner = new PackageScanner(pathToUserPackageJson);
    const moduleLoader = new ModuleLoader();

    const loadedModules: (AbstractModule | undefined)[] = await Promise.all(
      rokkitModules.map(rokkitModule => {
        if (packageScanner.isPackageInstalled(rokkitModule.moduleName)) {
          return moduleLoader.load(
            rokkitModule.moduleName,
            rokkitModule.mainClass
          );
        } else {
          return undefined;
        }
      })
    );

    this.moduleReferences.push(
      ...loadedModules.filter(ModuleLoader.filterNotUndefinedModules)
    );
    return Promise.resolve();
  }

  // TODO: Replace this fucntion based on the actual implementation of the abstract module
  /**
   * @function initializeRokkitModules
   * @param configuration
   * @returns Promise<void>
   */
  public async initializeRokkitModules(configuration: any): Promise<void> {
    await Promise.all(
      this.moduleReferences.map(
        async module => await module.initializeModule(configuration)
      )
    );
    return Promise.resolve();
  }

  // TODO: Replace this fucntion based on the actual implementation of the abstract module
  /**
   * @function injectDependencies
   * @param instanceMap
   * @returns Promise<void>
   */
  public async injectDependencies(
    instanceMap: Map<string, any>
  ): Promise<void> {
    await Promise.all(
      this.moduleReferences.map(
        async module => await module.injectDependencies(instanceMap)
      )
    );
    return Promise.resolve();
  }
}
