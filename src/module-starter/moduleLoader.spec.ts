// tslint:disable:no-unused-expression

import { expect } from "chai";
import { suite, test } from "mocha-typescript";
import { ModuleLoader } from "./moduleLoader";

@suite
export class ModuleLoaderSpec {
  @test
  public async shouldFindAndInitializeModule() {
    const moduleClass = await ModuleLoader.load(
      "@rokkit.ts/abstract-module",
      "AbstractModule"
    );
    expect(moduleClass).is.not.undefined;
    expect(moduleClass).is.not.null;
  }

  @test
  public async shouldNotFindAndInitializeModule() {
    const moduleClass = await ModuleLoader.load("@rokkit.ts/web", "WebStarter");
    expect(moduleClass).is.undefined;
  }
}
