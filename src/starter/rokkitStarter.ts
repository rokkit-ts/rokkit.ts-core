import { ComponentInitializer } from "../user-component/componentInitializer";
import { ComponentScanner } from "../user-component/componentScanner";
import { RokkitModuleStarter } from "../module-starter";

let rokkitStarter: RokkitStarter;

const CONTEXT_NAME = "ROKKIT_MAIN_CONTEXT";

class RokkitStarter {
  private readonly moduleStarter: RokkitModuleStarter;
  private readonly componentInitializer: ComponentInitializer;
  private readonly componentScanner: ComponentScanner;

  constructor() {
    this.moduleStarter = new RokkitModuleStarter();
    this.componentInitializer = new ComponentInitializer();
    this.componentScanner = new ComponentScanner();
  }

  public async runStartProcedure(): Promise<void> {
    await this.moduleStarter.loadRokkitModules("./package.json");
    await this.componentScanner.importUserComponents();
    await this.componentInitializer.initializeComponents(CONTEXT_NAME);
  }
}

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
