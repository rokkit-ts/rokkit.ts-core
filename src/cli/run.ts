import { execute } from "./utils";

// tslint:disable: no-console
export const run = async (production: boolean, rootClass?: string) => {
  console.log("Starting the application");
  if (production) {
    await execute(`node ./build/${rootClass || "app"}.js`);
  } else {
    await execute(`ts-node ./src/${rootClass || "app"}.ts`);
  }
};
