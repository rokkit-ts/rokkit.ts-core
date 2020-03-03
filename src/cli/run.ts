import { execute } from "./utils";

// tslint:disable: no-console
export const run = (rootClass?: string) => {
  console.log("Starting the application");
  execute(`ts-node ${rootClass || "./src/app.ts"}`);
};
