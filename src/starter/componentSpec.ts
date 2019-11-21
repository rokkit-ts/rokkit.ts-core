import { Inject } from "@rokkit.ts/dependency-injection";
import { Component } from "../components";

@Component()
export class ComponentSpec {
  constructor(@Inject("Hi Jann") test: string) {
    console.log(test);
  }
}
