import { Component, Inject } from "../components";
import { RokkitRunner } from "./rokkitStarter";

@RokkitRunner("")
@Component()
export class RokkitStarterSpec {
  constructor(@Inject("Hi Jann") test: string) {
    console.log(test);
  }
}
