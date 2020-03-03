// tslint:disable: no-console
import { ClassDeclarationResolver } from "@rokkit.ts/class-declaration-resolver";
import { execute } from "./utils";

const DEFAULT_SOURCE_DIR = "src";
const DEFAULT_OUT_DIR = "build";
const DEFAULT_CONFIG_DIR = "rokkit-declaration";
const DEFAULT_CONFIG_NAME = "class-declarations.json";

export const build = (sourceDir?: string) => {
  console.log("Building the application");
  ClassDeclarationResolver.createClassDeclarationFile(
    ".",
    sourceDir || DEFAULT_SOURCE_DIR,
    DEFAULT_CONFIG_DIR,
    DEFAULT_CONFIG_NAME,
    DEFAULT_OUT_DIR
  );
  execute(`tsc`);
};
