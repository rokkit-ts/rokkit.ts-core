// tslint:disable:no-unused-expression
import { Injectable } from "@rokkit.ts/dependency-injection";
import { expect } from "chai";
import { suite, test } from "mocha-typescript";
import { ComponentInitializer } from "./componentInitializer";

@suite
export class ComponentInitializerSpec {
  private componentInitializer: ComponentInitializer | undefined;

  public before() {
    this.componentInitializer = new ComponentInitializer();
  }

  @test
  public async shouldInitializeAllComponents() {
    const componentMap = await this.componentInitializer?.initializeComponents();
    const storedComponents = this.componentInitializer?.getComponents();

    expect(componentMap).is.not.undefined;
    expect(componentMap).is.not.empty;
    expect(componentMap?.get("TestComponent")).is.not.undefined;
    expect(storedComponents).is.not.undefined;
    expect(storedComponents).is.not.empty;
    expect(storedComponents?.get("TestComponent")).is.not.undefined;
  }

  @test
  public async shouldInitializeComponent() {
    const component = await this.componentInitializer?.initializeComponent(
      "TestComponent"
    );
    const storedComponent = this.componentInitializer?.getComponent(
      "TestComponent"
    );

    expect(storedComponent).is.not.undefined;
    expect(component).is.not.undefined;
  }
}

// tslint:disable-next-line:max-classes-per-file
@Injectable()
class TestComponent {
  constructor() {
    // tslint:disable-next-line:no-console
    console.log("Test Component init");
  }
}
