import { PackageScanner, RokkitModuleStarter } from "../module-starter";
import { ComponentInitializer, ComponentScanner } from "../user-component";

/**
 * Framework starter global class instances variable.
 * This is used to ensure that the framework only start once a time.
 */
let rokkitStarter: RokkitStarter;

/**
 * @class RokkitStarter
 * Core class of the framework. This class initializes all needed modules and components.
 * Furthermore this class runs the start process.
 */
class RokkitStarter {
  private readonly moduleStarter: RokkitModuleStarter;
  private readonly componentInitializer: ComponentInitializer;

  constructor() {
    this.moduleStarter = new RokkitModuleStarter(
      new PackageScanner("./package.json")
    );
    this.componentInitializer = new ComponentInitializer();
  }

  /**
   * @function runStartProcedure
   * @returns Promise<void>
   * This function run the start procedure of the whole framework.
   * Which include scanning for user components, rokkit.ts modules, and initializing both of them.
   */
  public async runStartProcedure(): Promise<void> {
    await this.moduleStarter.loadRokkitModules();
    await ComponentScanner.importUserComponents();
    const initializedComponents = await this.componentInitializer.initializeComponents();
    await this.moduleStarter.injectDependencies(initializedComponents);
    // TODO: add configurations when available!
    await this.moduleStarter.runModules(undefined);
  }
}

/**
 * @param rootDir
 * This decorator is the major api to start the whole framework. The decorator must be used on a class.
 * This class will be automatically start the framework on running it.
 */
export function RokkitRunner(rootDir: string) {
  if (!rokkitStarter) {
    rokkitStarter = new RokkitStarter();
    rokkitStarter
      .runStartProcedure()
      .then(resolved => console.log("Rokkit.ts started"));
  }
  // tslint:disable-next-line:no-empty
  return (constructor: Function) => {};
}
