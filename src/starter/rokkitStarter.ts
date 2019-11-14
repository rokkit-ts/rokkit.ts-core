import { RokkitModuleStarter } from "../module-starter";

let rokkitStarter: RokkitStarter;

class RokkitStarter {
  private readonly moduleStarter: RokkitModuleStarter;

  constructor() {
    this.moduleStarter = new RokkitModuleStarter();
  }

  public async runStartProcedure(): Promise<void> {
    await this.moduleStarter.loadRokkitModules("./package.json");
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
