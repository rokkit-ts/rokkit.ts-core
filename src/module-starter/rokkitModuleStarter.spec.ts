// tslint:disable:no-unused-expression

import { expect } from "chai";
import { suite, test } from "mocha-typescript";
import { PackageScanner } from "./packageScanner";
import { RokkitModuleStarter } from "./rokkitModuleStarter";

@suite
export class RokkitModuleStarterSpec {
  @test
  public async shouldNotLoadAnyRokkitModule() {
    const moduleLoader = new RokkitModuleStarter(new PackageScanner());
    await moduleLoader.loadRokkitModules();
    expect(moduleLoader.ModuleReferences).is.not.undefined;
    expect(moduleLoader.ModuleReferences).is.empty;
  }
}
