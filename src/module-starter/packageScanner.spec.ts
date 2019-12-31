// tslint:disable:no-unused-expression

import { expect } from "chai";
import { suite, test } from "mocha-typescript";
import { PackageScanner } from "./packageScanner";

@suite
export class PackageScannerSpec {
  @test
  public shouldFindPackageFsExtra() {
    const packageScanner = new PackageScanner();
    const isInstalled = packageScanner.isPackageInstalled("fs-extra");
    expect(isInstalled).is.true;
  }

  @test
  public shouldNotFindPackageRokkitWeb() {
    const packageScanner = new PackageScanner("./package.json");
    const isInstalled = packageScanner.isPackageInstalled("@rokkit.ts/web");
    expect(isInstalled).is.false;
  }
}
