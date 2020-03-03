#!/usr/bin/env node
import * as yargs from "yargs";
import { build } from "./build";
import { init } from "./init";
import { run } from "./run";

const options = yargs
  .usage("Usage: $0 <command> [options]")
  .command("build", "Builds the application")
  .example("$0 build", "Builds the application, so that it is production ready")
  .command(
    ["run", "start", "up"],
    "Starts the application, default is the development mode",
    args => {
      return args.option("p", {
        alias: ["prod", "production"],
        description: "Run the application in production mode",
        type: "boolean"
      });
    }
  )
  .example("$0 run", "Starts the application in development mode")
  .command("init", "Initialize a new Rokkit.ts project", args => {
    return args
      .alias("n", "name")
      .nargs("n", 1)
      .describe("n", "sets the project name")
      .demandOption(["n"]);
  })
  .example(
    "$0 init -n sample",
    "Creates a new project dir for the name: sample"
  )
  .demandCommand()
  .help("h")
  .alias("h", "help").argv;

switch (options._[0]) {
  case "init":
    init(options.name as string);
    break;
  case "build":
    build();
    break;
  case "up":
  case "run":
  case "start":
    const prod = options.prod as boolean;
    run(prod);
    break;
}
