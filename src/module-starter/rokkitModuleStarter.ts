import { rokkitModules } from "../resource/rokkit-module-declarations";
import { AbstractModule } from "./abstractModule";
import { ModuleLoader } from "./moduleLoader";
import { PackageScanner } from "./packageScanner";

export class RokkitModuleStarter {
  private moduleReferences: AbstractModule[];

  public constructor() {
    this.moduleReferences = [];
  }

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

  private async initializeRokkitModules(configuration: any): Promise<void> {
    await Promise.all(
      this.moduleReferences.map(
        async module => await module.initializeModule(configuration)
      )
    );
    return Promise.resolve();
  }

  private async injectDependencies(
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
