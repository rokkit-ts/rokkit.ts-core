// tslint:disable:no-unused-expression
import { expect } from "chai";
import { suite, test } from "mocha-typescript";
import { ComponentScanner } from "./componentScanner";

@suite
export class ComponentScannerSpec {
  @test
  public async shouldImportUserComponents() {
    const importedComponents: (
      | string
      | undefined
    )[] = await ComponentScanner.importUserComponents();
    expect(importedComponents).is.not.undefined;
    expect(importedComponents).is.not.empty;
  }
}
